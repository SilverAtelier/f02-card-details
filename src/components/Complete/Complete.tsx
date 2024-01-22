import image from '../../assets/images/icon-complete.svg';
import Button from '../Button/Button';
import style from './complete.module.css';
const Complete = () => {
    return (
        <div className={style.completeWrapper}>
            <div className={style.completeImg}>
                <img  className={style.completeWrapperImg} src={image} alt="complete"/>
            </div>
            <div className="complete-text">
                <h2 className={style.completeWrapper_h2}>THANK YOU!</h2>
                <p className={style.completeWrapper_p}>We've added your card details</p>
            </div>
            <Button classname='completeBtn' text='Complete' type='button'/>
        </div>
    );
};

export default Complete;