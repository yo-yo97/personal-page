const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll(".choice_text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestion = []

let questions = [
  {
    question: '輔大哪裡沒有學餐？',
    choice1: '理園',
    choice2: '輔園',
    choice3: '文園',
    choice4: '法園',
    answer: 4,
  },
  {
    question: '體育器材哪裡借？',
    choice1: '中美堂',
    choice2: '聖言樓',
    choice3: '積建樓',
    choice4: '國璽樓',
    answer: 1,
  },
  {
    question: '哪個資工教授最漂亮？',
    choice1: '李曉祺教授',
    choice2: '梅興教授',
    choice3: '王國華教授',
    choice4: '周賜福教授',
    answer: 1,
  },
  {
    question: '王國華教授的口頭禪？',
    choice1: '啥',
    choice2: 'ㄏㄚˋ',
    choice3: 'Ｒ',
    choice4: '煞',
    answer: 3,
  },
  {
    question: 'NISRA社課是星期幾？',
    choice1: '星期二',
    choice2: '星期三',
    choice3: '星期四',
    choice4: '星期五',
    answer: 1,
  },
  {
    question: '輔大資工畢業要幾學分？',
    choice1: '132',
    choice2: '128',
    choice3: '124',
    choice4: '136',
    answer: 2,
  },
  {
    question: '哪一堂不是輔大資工系必修課？',
    choice1: '人生哲學',
    choice2: '電腦圖學',
    choice3: '數位邏輯設計 ',
    choice4: '機率與統計',
    answer: 2,
  },
  {
    question: '輔大哪個節日沒有放假？',
    choice1: '聖誕節',
    choice2: '教師節',
    choice3: '復活節',
    choice4: '清明節',
    answer: 3,
  },
  {
    question: '514沒有哪家店？',
    choice1: '椒麻雞大王',
    choice2: '雪城',
    choice3: '駕訓班 ',
    choice4: '想初享廚',
    answer: 1,
  },
  {
    question: '梅興教授的辦公室是哪一間？',
    choice1: '642',
    choice2: '645',
    choice3: '624',
    choice4: '625',
    answer: 4,
  }
]

const score_points = 10
const question_n = 10

startGame = () => {
	questionCounter = 0
	score = 0
	availableQuestion = [...questions]
	getNewQuestion()
}

getNewQuestion = () => {
	if(availableQuestion.length === 0 || questionCounter > question_n){
		localStorage.setItem('mostRecentScore', score)
		
		return window.location.assign('end.html')
	}

	questionCounter++
	progressText.innerText = `Question ${questionCounter} of ${question_n}`
	progressBarFull.style.width = `${(questionCounter/question_n) * 100}%`
	
	const questionIndex = Math.floor(Math.random() * availableQuestion.length)
	currentQuestion = availableQuestion[questionIndex]
	question.innerText = currentQuestion.question

	choices.forEach(choice => {
		const number = choice.dataset['number']
		choice.innerText = currentQuestion['choice' + number]
	})

	availableQuestion.splice(questionIndex, 1)

	acceptingAnswers = true
}

choices.forEach(choice =>{
	choice.addEventListener('click', e =>{
		if(!acceptingAnswers) return

		acceptingAnswers = false
		const selectedChoice = e.target
		const selectedAnswer = selectedChoice.dataset['number']
		
		let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

		if(classToApply === 'correct'){
			incrementScore(score_points)
		}
		selectedChoice.parentElement.classList.add(classToApply)

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply)
			getNewQuestion()
		}, 1000)
	})
})

incrementScore = num => {
	score += num
	scoreText.innerText = score

}

startGame()