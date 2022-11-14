import s from './input.module.sass'
import {useRef, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCoffee} from "@fortawesome/free-solid-svg-icons/faCoffee";

function App() {

    const ref = useRef()
    const [valid, setValid] = useState('');
    const [progress, setProgress] = useState('');
    const [operator, setOperator] = useState('')

    function submit() {
        setOperator('')
        setProgress('')
        setValid('')
        if (ref.current.value) {
            fetch(`https://api.regius.name/iface/phone-number.php?phone=${ref.current.value}&token=8bec50f53cefa97e54659092c54c66fdeedf0adb`)
                .then(response => response.json())
                .then(json => setOperator(json))
                .catch(er => setProgress('error'))
        } else {
            setValid('empty field')
        }
    }

    return (
        <div className={s.main}>
            <div className={s.search__input__wrap}>
                <input type="text" placeholder='Ваш номер' ref={ref}/>
            </div>
            <div className={s.btn}>
                <button>
                    <div className={s.btn_text} onClick={() => submit()}>ЗАКАЗАТЬ <FontAwesomeIcon icon={faCoffee}/>
                    </div>
                </button>
            </div>
            <h1>{valid}</h1>
            <h1>{operator.brand ? (operator.brand) : (progress)}</h1>
        </div>
    );
}

export default App;
