document.addEventListener('DOMContentLoaded', function(){

let buttonsDetailCourse       = [...document.querySelectorAll('.js-open-detail')]
let buttonsDetailCourseClose  = [...document.querySelectorAll('.js-close-detail')]
let buttonsMoreDay            = [...document.querySelectorAll('.js-open-more')]

let tabViewButtons            = [...document.querySelectorAll('.js-tab-view-link')]
let tabViewContents           = [...document.querySelectorAll('.js-tab-view-content')]
let tabSelectionsView         = [...document.querySelectorAll('.js-current-selection')]

let hoverDetailTextTrigger    = [...document.querySelectorAll('.js-hover-detail-text')] 

const dayTable                  = document.querySelector('.day-table')
const dayTableDefaultStep       = 135
let dayTableArrowLeft           = document.querySelector('.js-arrow-left')
let dayTableArrowRight          = document.querySelector('.js-arrow-right')
let dayTableWidth               = dayTable.offsetWidth
let dayTableCurrentStep         = 0
let dayTableCountSteps          = Math.ceil((dayTableWidth - 1000) / dayTableDefaultStep)

let courseUserListMore          = document.querySelector('.js-more-users')

const defaultDayOfMounthHeight = 160;
const mediaQuery = window.matchMedia('(max-width: 1024px)')

// console.log(window.clientWidth);
if(mediaQuery.matches){
	buttonsDetailCourse.forEach((elem) => {
		elem.addEventListener('click', function(event)  {
			try{
				let openItem = [...document.querySelectorAll('.event-info')].filter(info => info.classList.contains('open'))[0]
				if( openItem != undefined) openItem.classList.remove('open')
	
				this.closest('.events-list__item').querySelector('.event-info').classList.add('open')
				let items = [...document.querySelectorAll('.calendar-table__row')].forEach(element => {
					element.classList.remove('open')
				});
				this.closest('.calendar-table__row').classList.add('open')
	
			}catch (error){
				console.warn(error)
			}
	
		})
	});

}else{
	buttonsDetailCourse.forEach((elem) => {
		elem.addEventListener('mouseover', function(event)  {
			try{
				let openItem = [...document.querySelectorAll('.event-info')].filter(info => info.classList.contains('open'))[0]
				if( openItem != undefined) openItem.classList.remove('open')
	
				this.closest('.events-list__item').querySelector('.event-info').classList.add('open')
	
			}catch (error){
				console.warn(error)
			}
	
		})
	});
}

buttonsDetailCourseClose.forEach((elem) => {
	elem.addEventListener('click', function(event)  {
		try{
			this.closest('.event-info').classList.remove('open')
		}catch (error){
			console.warn(error)
		}

	})
})

buttonsMoreDay.forEach((elem) => {
	elem.addEventListener('click', function(event)  {
		try{
			this.closest('.calendar-table__item').classList.add('full')
			let finalHeight = this.closest('.calendar-table__item').offsetHeight;
			let calculateMargin = finalHeight - defaultDayOfMounthHeight;

			this.closest('.calendar-table__item').style.marginBottom = -calculateMargin + 'px';

		}catch (error){
			console.warn(error)
		}

	})
})

tabViewButtons.forEach((elem) => {
	elem.addEventListener('click', function(event)  {
		event.preventDefault();
		try{
			let viewMode = this.getAttribute('data-view');
			tabViewButtons.forEach((val,idx) => { val.classList.remove('active') })
			this.classList.add('active')
			tabViewContents.forEach((val,idx) => { val.classList.remove('active') })
			tabViewContents.filter((el) => el.getAttribute('data-view') == viewMode)[0].classList.add('active')
			tabSelectionsView.forEach((val,idx) => { val.classList.remove('active') })
			tabSelectionsView.filter((el) => el.getAttribute('data-view') == viewMode)[0].classList.add('active')

		}catch (error){
			console.warn(error)
		}

	})
})

if(mediaQuery.matches){
	hoverDetailTextTrigger.forEach((elem) => {
		elem.addEventListener('click', function(event)  {
			event.preventDefault();
			try{
				console.log(this);
				this.classList.add('full')
				this.querySelector('.js-hide-preview').classList.add('hide')
				this.querySelector('.js-open-detail').classList.add('show')
	
			}catch (error){
				console.warn(error)
			}
		})

	})
}else{
	hoverDetailTextTrigger.forEach((elem) => {
		elem.addEventListener('mouseover', function(event)  {
			event.preventDefault();
			try{
				console.log(this);
				this.classList.add('full')
				this.querySelector('.js-hide-preview').classList.add('hide')
				this.querySelector('.js-open-detail').classList.add('show')
	
			}catch (error){
				console.warn(error)
			}
		})
		elem.addEventListener('mouseout', function(event)  {
			event.preventDefault();
			try{
				this.classList.remove('full')
	
				this.querySelector('.js-hide-preview').classList.remove('hide')
				this.querySelector('.js-open-detail').classList.remove('show')
	
			}catch (error){
				console.warn(error)
			}
		})
	})

}


dayTableArrowRight.addEventListener('click', function() {
	
	dayTableCurrentStep++;

	if(dayTableCurrentStep > 0) {
		dayTableArrowLeft.classList.add('active')
	}else{
		dayTableArrowLeft.classList.remove('active')
	}

	if(dayTableCurrentStep < dayTableCountSteps){
		dayTable.style.left = -(dayTableCurrentStep * dayTableDefaultStep) + 'px';
	}
	if(dayTableCurrentStep == dayTableCountSteps){
		dayTableArrowRight.classList.remove('active')
	}else{
		dayTableArrowRight.classList.add('active')

	}
})

dayTableArrowLeft.addEventListener('click', function() {

	dayTableCurrentStep--;

	if(dayTableCurrentStep > 0) {
		dayTableArrowLeft.classList.add('active')
	}else{
		dayTableArrowLeft.classList.remove('active')
	}

	if(dayTableCurrentStep < dayTableCountSteps){
		dayTable.style.left = -(dayTableCurrentStep * dayTableDefaultStep) + 'px';
	}
	if(dayTableCurrentStep == dayTableCountSteps){
		dayTableArrowRight.classList.remove('active')
	}else{
		dayTableArrowRight.classList.add('active')

	}
})

if(courseUserListMore){
	courseUserListMore.addEventListener('click', function() {

		try{
			this.closest('.user-list__list').querySelector('.user-list__hide-list').classList.toggle('open')
			this.classList.toggle('active')
			if(this.classList.contains('active')){
				this.innerText = 'Свернуть '
			}else{
				this.innerText = 'Все слушатели'
			} 

		}catch(error){
			console.warn(error)
		}
	})
}

document.addEventListener('click', function(event) {
	let openDay = [...document.querySelectorAll('.calendar-table__item')];

	if(openDay != undefined) {
		openDay = openDay.filter((elem) => elem.classList.contains('full'))[0]
	}

	try{
		if (!openDay.contains(event.target)) {
			openDay.classList.remove('full')
		}
	}catch(error){
		console.warn(error);
	}

})

});