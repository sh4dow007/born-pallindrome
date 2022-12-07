var birthDateInput = document.querySelector('#birth-date')
var checkButton = document.querySelector('#check')
var result = document.querySelector('#result')
var palindrome = document.querySelector('#tell-palindrome')
var mainApp = document.querySelector('#main-app')
var finalResult = document.querySelector('#final-result')
var loadingImg = document.querySelector('#loading-img')

var monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

function loadingState() {
  setTimeout(function () {
    loadingImg.style.display = 'none'
    finalResult.style.display = 'block'
  }, 3000)
  return
}

function isPalindrome(string) {
  if (string === string.split('').reverse().join('')) {
    return true
  } else {
    return false
  }
}

function checkNearestPalindrome(ddOG, mmOG, yyyyOG) {
  result.textContent = 'Your birth date is not a palindrome!'

  let ddNo1 = Number(ddOG)
  let mmNo1 = Number(mmOG)
  let yyyyNo1 = Number(yyyyOG)
  let dayCounterForward = 0

  let ddNo2 = Number(ddOG)
  let mmNo2 = Number(mmOG)
  let yyyyNo2 = Number(yyyyOG)
  let dayCounterBackward = 0

  while (1) {
    ddNo1 += 1
    if (ddNo1 > monthDays[mmNo1 - 1]) {
      ddNo1 = 1
      mmNo1 += 1
      if (mmNo1 > 12) {
        mmNo1 = 1
        yyyyNo1 += 1
      }
    }
    dayCounterForward++

    var ddString = ddNo1.toString()
    var mmString = mmNo1.toString()
    var yyyyString = yyyyNo1.toString()
    var yyString = yyyyString.substring(2)
    if (mmString.length === 1) {
      mmString = '0' + mmString
    }
    if (ddString.length === 1) {
      ddString = '0' + ddString
    }
    let [forwardCheck, dateFormat] = checkAllFormats(
      ddString,
      mmString,
      yyyyString,
      yyString
    )
    if (forwardCheck !== 0) {
      return [ddString, mmString, yyyyString, dayCounterForward, dateFormat, 1]
    }

    if (yyyyNo2 > 0) {
      ddNo2 -= 1
      if (ddNo2 < 1) {
        mmNo2 -= 1
        if (mmNo2 < 1) {
          yyyyNo2 -= 1
          mmNo2 = 12
          if (yyyyNo2 < 1) {
            break
          }
          ddNo2 = monthDays[mmNo2 - 1]
        }
        ddNo2 = monthDays[mmNo2 - 1]
      }
      dayCounterBackward++

      var ddString = ddNo2.toString()
      var mmString = mmNo2.toString()
      var yyyyString = yyyyNo2.toString()
      var yyString = yyyyString.substring(2)
      if (mmString.length === 1) {
        mmString = '0' + mmString
      }
      if (ddString.length === 1) {
        ddString = '0' + ddString
      }
      let [backwardCheck, dateFormat] = checkAllFormats(
        ddString,
        mmString,
        yyyyString,
        yyString
      )
      if (backwardCheck !== 0) {
        return [
          ddString,
          mmString,
          yyyyString,
          dayCounterBackward,
          dateFormat,
          0,
        ]
      }
    }
  }
}

function checkAllFormats(dd, mm, yyyy, yy) {
  var dateFormat1 = dd + mm + yyyy
  var dateFormat2 = mm + dd + yyyy
  var dateFormat3 = mm + dd + yy
  var dateFormat4 = dd + mm + yy
  var dateFormat5 = yyyy + mm + dd
  var dateFormat6 = yy + mm + dd

  if (isPalindrome(dateFormat1)) {
    return [
      'Your birth date in (dd-mm-yyyy) ' +
        dd +
        '-' +
        mm +
        '-' +
        yyyy +
        ' format is a palindrome',
      'dd-mm-yyyy',
    ]
  } else if (isPalindrome(dateFormat2)) {
    return [
      'Your birth date in (mm-dd-yyyy) ' +
        mm +
        '-' +
        dd +
        '-' +
        yyyy +
        ' format is a palindrome',
      'mm-dd-yyyy',
    ]
  } else if (isPalindrome(dateFormat3)) {
    return [
      'Your birth date in (mm-dd-yy) ' +
        mm +
        '-' +
        dd +
        '-' +
        yy +
        ' format is a palindrome',
      'mm-dd-yy',
    ]
  } else if (isPalindrome(dateFormat4)) {
    return [
      'Your birth date in (dd-mm-yy) ' +
        dd +
        '-' +
        mm +
        '-' +
        yy +
        ' format is a palindrome',
      'dd-mm-yy',
    ]
  } else if (isPalindrome(dateFormat5)) {
    return [
      'Your birth date in (yyyy-mm-dd) ' +
        yyyy +
        '-' +
        mm +
        '-' +
        dd +
        ' format is a palindrome',
      'yyyy-mm-dd',
    ]
  } else if (isPalindrome(dateFormat6)) {
    return [
      'Your birth date in (yy-mm-dd) ' +
        yy +
        '-' +
        mm +
        '-' +
        dd +
        ' format is a palindrome',
      'yy-mm-dd',
    ]
  } else {
    return [0]
  }
}

function inputHandler(event) {
  event.preventDefault()
  if (!birthDateInput.value) {
    alert('Please enter a valid birth date! :)')
    return
  }

  finalResult.style.display = 'none'
  loadingImg.style.display = 'block'

  loadingState()

  var birthDate = birthDateInput.value

  var spiltDate = birthDate.split('-')
  var ddOG = spiltDate[2]
  var mmOG = spiltDate[1]
  var yyyyOG = spiltDate[0]
  var yyOG = yyyyOG.substring(2)

  var result = checkAllFormats(ddOG, mmOG, yyyyOG, yyOG)[0]
  if (result !== 0) {
    displayResult(result)
    return
  } else {
    var [ddString, mmString, yyyyString, dayCounter, dateFormat, whichWay] =
      checkNearestPalindrome(ddOG, mmOG, yyyyOG)
    if (whichWay === 1) {
      displayResult(
        'But, ' +
          ddString +
          '-' +
          mmString +
          '-' +
          yyyyString +
          ' which would have been ' +
          dayCounter +
          ' days away is a Palindrome in ' +
          dateFormat +
          ' format'
      )
      return
    } else {
      displayResult(
        'But, ' +
          ddString +
          '-' +
          mmString +
          '-' +
          yyyyString +
          ' which was ' +
          dayCounter +
          ' days away is a Palindrome in ' +
          dateFormat +
          ' format'
      )
      return
    }
  }
}

function displayResult(string) {
  palindrome.textContent = string
}

checkButton.addEventListener('click', inputHandler)
