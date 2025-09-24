'use strict'
window.addEventListener('DOMContentLoaded', () => {
	let uzsRate

	const inputMoney = document.querySelector('#money-input'),
		displayResult = document.querySelector('#display-result'),
		convertBtn = document.querySelector('#convert-btn')

	function formatNumInput(el) {
		el.value = el.value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	}

	inputMoney.addEventListener('input', () => formatNumInput(inputMoney))

	fetch('https://open.er-api.com/v6/latest/USD', {
		method: 'GET',
	})
		.then(res => res.json())
		.then(data => {
			uzsRate = data.rates.UZS
		})
		.catch(err => {
			alert('Xatolik yuz berdi: ' + err.message)
		})

	function convertMoney() {
		const inputValue = inputMoney.value.replace(/\s/g, '')

		if (!uzsRate) {
			alert('Kurs hali yuklanmadi, keyinroq harakat qiling')
		}

		if (inputValue === '' || isNaN(inputValue)) {
			alert("Iltimos to'g'ri ma'lumot kiriting")
		}

		const mainResult = (inputValue / uzsRate).toFixed(2)
		displayResult.textContent = `${mainResult} $`

		localStorage.setItem('usdValue', displayResult.textContent)
	}

	convertBtn.addEventListener('click', () => {
		convertMoney()
		inputMoney.value = ''
	})

	const resultSaved = localStorage.getItem('usdValue')
	displayResult.textContent = resultSaved
})
