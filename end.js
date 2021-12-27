const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const finalTitle = document.querySelector('#finalTitle')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore
if (mostRecentScore < 30) {
    finalTitle.innerText = "輔大王力宏"
}
else if (mostRecentScore >= 30 && mostRecentScore < 60) {
    finalTitle.innerText = "輔大羅志祥"
}
else if (mostRecentScore >= 60 && mostRecentScore < 80) {
    finalTitle.innerText = "輔大林俊傑"
}
else {
    finalTitle.innerText = "輔大李靚蕾"
}



username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})

saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('highScores.html')
} 