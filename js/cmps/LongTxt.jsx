export function LongTxt({ txt, isLongTxtShown, toggleLongTxt }) {
    return (
        <p className='long-txt'>
            {isLongTxtShown || txt.length < 100 ? txt : txt.substring(0, 50) + '...'}
            {txt.length > 100 && (
                <button className='long-txt-btn' onClick={toggleLongTxt}>{isLongTxtShown ? 'Read Less' : 'Read More'}</button>
            )}
        </p>
    )
}