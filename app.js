class Plate {
    constructor(positionX, positionY, width, height, text) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.text = text;
    }
}


var rectangle = document.getElementById('rectangle');
var output = document.getElementById('output');

document.addEventListener('click', function(event) {
  // 클릭한 위치의 좌표
  var x = event.clientX;
  var y = event.clientY;

  // 결과를 출력
  output.innerHTML = 'Clicked at X: ' + x + ', Y: ' + y;

  // 네모 상자 위치 설정
  rectangle.style.left = x - rectangle.offsetWidth / 2 + 'px';
  rectangle.style.top = y - rectangle.offsetHeight / 2 + 'px';

  // 클립보드에서 텍스트 읽기
//   navigator.clipboard.readText().then(function(text) {
//     // 네모 상자 안에 클립보드의 텍스트 표시
//     var span = rectangle.querySelector('span');
//     span.textContent = text;
//  });
    //  var span = rectangle.querySelector('span');
    //  span.textContent = "!@#$%^";

  // 네모 상자 표시
  rectangle.style.display = 'flex';
});

  function editText(id) {
    console.log('editText()');    
    // 대화상자를 통해 텍스트 입력 받기
    var newText = prompt('Enter new text:', '');

    // 사용자가 취소 버튼을 누르면 newText는 null이 됨
    if (newText !== null) {
      // 네모 상자의 텍스트 변경
      var div = document.getElementById(id);      
      var textSize = getTextSize(newText);
      console.log('getTextSize = '+ textSize.width +', ' + textSize.height);

      div.style.width = textSize.width + 'px';
      div.style.height = textSize.height + 'px';
      div.textContent = newText;
    }
  }

  function resizeDiv() {
    console.log('resizeDiv()');
    var div = document.getElementById('resizableDiv');
    var text = div.textContent;

    // 계산된 텍스트 크기를 기반으로 DIV 크기 조절
    var textSize = getTextSize(text);
    console.log('getTextSize = '+ textSize.width +', ' + textSize.height);
    div.style.width = textSize.width + 'px';
    div.style.height = textSize.height + 'px';
  }

  function getTextSize(text) {
    console.log('getTextSize()');
    var dummyDiv = document.createElement('div');
    dummyDiv.style.visibility = 'hidden';
    dummyDiv.style.position = 'absolute';
    dummyDiv.style.whiteSpace = 'pre-line';
    dummyDiv.style.font = window.getComputedStyle(document.body).font;

    dummyDiv.textContent = text;
    document.body.appendChild(dummyDiv);

    var textSize = {
      width: dummyDiv.offsetWidth,
      height: dummyDiv.offsetHeight
    };

    document.body.removeChild(dummyDiv);
    return textSize;
  }

  function paste(id) {
    console.log('paste()');
    var div = document.getElementById(id);
    var text = div.textContent;

    navigator.clipboard.writeText(text).then(function() {
        console.log('Text copied to clipboard: ' + text);
        }).catch(function(err) {
            console.error('Failed to copy text to clipboard:', err);
        });
    // // 기본 컨텍스트 메뉴를 표시하지 않도록 이벤트를 취소
    // event.preventDefault();
  }

  