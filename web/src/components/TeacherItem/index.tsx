import React from 'react';

import WhatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
	return (
		<article className='teacher-item'>
			<header>
				<img src="https://avatars2.githubusercontent.com/u/61285101?s=460&u=46dfd8fe9f42b73055ea16aff71e2b940a9e7fc7&v=4" alt="Pedro Henrique" />
				<div>
					<strong>Pedro Henrique</strong>
					<span>Javascript</span>
				</div>
			</header>

			<p>
				Main Bardo no Lolzinho
                <br /><br />
                Um Louco caçador de Sinos, com uma gameplay elevadissima e dono de belíssimos códigos.
            </p>

			<footer>
				<p>
					Preço/hora
                    <strong>R$ 1.000.000,00</strong>
				</p>
				<button type='button'>
					<img src={WhatsappIcon} alt="Whatsapp" />
                            Entrar em contato
                        </button>
			</footer>
		</article>
	)
}

export default TeacherItem