window.onload = function () {
	const startBtn = document.querySelector('.start')
	const pasueBtn = document.querySelector('.pause')
	const stopBtn = document.querySelector('.stop')
	const resetBtn = document.querySelector('.reset')
	const historyBtn = document.querySelector('.history')
	const stopwatch = document.querySelector('.stopwatch')
	const time = document.querySelector('.time')
	const timeList = document.querySelector('.time-list')

	const infoBtn = document.querySelector('.fa-question')
	const modalShadow = document.querySelector('.modal-shadow')
	const closerModalBtn = document.querySelector('.close')

	let countTime
	let minutes = 0
	let seconds = 0
	let timesArr = []

	//kolory
	const colorPicker = document.querySelector('.colorpicker')
	const colorBtn = document.querySelector('.fa-paint-brush')
	const colorPanel = document.querySelector('.colors')
	const colorOne = document.querySelector('.one')
	const colorTwo = document.querySelector('.two')
	const colorThree = document.querySelector('.three')
	let root = document.documentElement
    

	const handleStart = () => {
		// przerywasetInterval
		clearInterval(countTime) // zapobiega ciągłemy wywoływania podczas kilkania start
		countTime = setInterval(() => {
			if (seconds < 9) {
				seconds++
				stopwatch.textContent = `${minutes}:0${seconds}`
			} else if (seconds >= 0 && seconds < 59) {
				seconds++
				stopwatch.textContent = `${minutes}:${seconds}`
			} else {
				minutes++
				seconds = 0
				stopwatch.textContent = `${minutes}:00`
			}
		}, 100)
	}

	const handlePause = () => {
		clearInterval(countTime)
	}

	const handleStop = () => {
		// minutes !== 0 || seconds !== 0
		if (stopwatch.textContent !== '0:00') {
			time.style.visibility = 'visible'
			time.textContent = `ostatni czas: ${stopwatch.textContent}`
			timesArr.push(stopwatch.textContent)
		}

		clearStuuf()

		// archivumNum++
		// const archivumContent = document.createElement('li')
		// archivumContent.innerHTML = `Pomiar nr ${archivumNum} ${stopwatch.textContent}`
		// timeList.append(archivumContent)
		// const archivumContent =  `<li>Pomiar nr ${archivumNum} ${stopwatch.textContent}</li>`
		// timeList.insertAdjacentHTML('beforeend', archivumContent);
	}

	const handleReset = () => {
		clearStuuf()
		time.style.visibility = 'hidden'
		// timesArr.splice(0, timesArr.length)
		timesArr = []
	}

	const clearStuuf = () => {
		clearInterval(countTime)
		stopwatch.textContent = `0:00`
		timeList.textContent = '' // czyszczenie archiwum po ponowym kliknięciu stop
		minutes = 0
		seconds = 0
	}

	const showHistory = () => {
		timeList.textContent = '' // Zapezpiecza przed duplikajcą
		let num = 1

		timesArr.forEach(time => {
			const newTime = document.createElement('li')
			newTime.innerHTML = `Pomiar nr ${num} <span>${time}</span>`
			timeList.appendChild(newTime)
			num++
		})
	}

	const showModal = event => {
		if (!(modalShadow.style.display === 'block')) {
			modalShadow.style.display = 'block'
		} else {
			modalShadow.style.display = 'none'
		}

		modalShadow.classList.toggle('modal-animation')
	}

	startBtn.addEventListener('click', handleStart)
	pasueBtn.addEventListener('click', handlePause)
	stopBtn.addEventListener('click', handleStop)
	resetBtn.addEventListener('click', handleReset)
	historyBtn.addEventListener('click', showHistory)

	infoBtn.addEventListener('click', showModal)
	closerModalBtn.addEventListener('click', showModal)
	window.addEventListener('click', e => {
		e.target === modalShadow ? showModal() : false
	})



	// zmiana kolorów
    colorPicker.addEventListener('input', () => {
		const newColor = colorPicker.value
		document.documentElement.style.setProperty('--first-color', newColor)
	})

	colorBtn.addEventListener('click', () => {
		colorPanel.classList.toggle('show-colors')
	})

	colorOne.addEventListener('click', () => {
		root.style.setProperty('--first-color', 'rgb(250, 20, 6)')
		root.style.setProperty('--hover-color', 'rgb(209, 33, 24)')
        colorPicker.value = '#fa1406'
	})

	colorTwo.addEventListener('click', () => {
		root.style.setProperty('--first-color', 'rgb(6, 173, 250)')
		root.style.setProperty('--hover-color', 'rgb(28, 145, 199)')
        colorPicker.value = '#06adfa'
	})

	colorThree.addEventListener('click', () => {
		root.style.setProperty('--first-color', 'rgb(0, 255, 42)')
		root.style.setProperty('--hover-color', 'rgb(28, 209, 58)')
        colorPicker.value = '#00ff2a'
	})

}
