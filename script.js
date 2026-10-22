// [1단계] 데이터는 브라우저 메모리(배열)에만 저장됩니다.
// → 새로고침하면 모두 사라집니다. (2단계에서 서버로 옮길 예정)
const messages = [];

const form = document.getElementById('message-form');
const nameInput = document.getElementById('name-input');
const messageInput = document.getElementById('message-input');
const list = document.getElementById('message-list');
const count = document.getElementById('count');

// 저장 버튼을 누르면 실행
form.addEventListener('submit', (event) => {
  event.preventDefault(); // 폼 기본 동작(페이지 새로고침) 막기

  const name = nameInput.value.trim();
  const content = messageInput.value.trim();
  if (!name || !content) return;

  messages.unshift({
    name,
    content,
    createdAt: new Date(),
  });

  messageInput.value = '';
  render();
});

// messages 배열을 화면에 그리기
function render() {
  list.innerHTML = '';
  count.textContent = messages.length;

  if (messages.length === 0) {
    list.innerHTML = '<li class="empty">아직 메시지가 없습니다.</li>';
    return;
  }

  for (const msg of messages) {
    const li = document.createElement('li');
    li.className = 'message-item card';

    const meta = document.createElement('div');
    meta.className = 'meta';

    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = msg.name; // textContent를 써야 <script> 같은 입력이 실행되지 않음

    const date = document.createElement('span');
    date.className = 'date';
    date.textContent = new Date(msg.createdAt).toLocaleString('ko-KR');

    const content = document.createElement('p');
    content.className = 'content';
    content.textContent = msg.content;

    meta.append(name, date);
    li.append(meta, content);
    list.append(li);
  }
}

render();
