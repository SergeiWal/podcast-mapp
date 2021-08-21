//https://podcast-mapp-default-rtdb.europe-west1.firebasedatabase.app/

export class Question{
    static create(question){
        return fetch('https://podcast-mapp-default-rtdb.europe-west1.firebasedatabase.app/questions.json',{
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        }). then((response)=>{
            return response.json();
        }).then((response)=>{
            question.id = response.name;
            return question;
        }).then(_addToLocalStorage)
        .then(Question.renderList);
    }

    static renderList(){
        const questions = _getQuestionsFromLocalStorage();
        const html = questions.length
            ?questions.map(_toCard).join('')
            :`<div class="mui--text-headline">You haven't asked anythinq</div>`;
    
        const list = document.getElementById('list');
        list.innerHTML = html;
    }

    static fetch(token){
        if(!token){
            return Promise.resolve(`<p class="error">You don't have a token</p>`);
        }

        return fetch(`https://podcast-mapp-default-rtdb.europe-west1.firebasedatabase.app/questions.json?auth=${token}`)
            .then((response)=>{
                return response.json();
            })
            .then((response)=>{
                if(response && response.error){
                    return `<p class="error">${response.error}</p>`
                }

                return response ? Object.keys(response).map(key=>({
                    ...response[key],
                    id: key,
                })) : [];
            });
    }

    static listToHTML(questions){
        return questions.length
            ? `<ol>${questions.map(q=>`<li>${q.text}</li>`).join('')}</ol>`
            : `<p>There aren't questions</p>`;
    }
}

function _addToLocalStorage(question){
    const all = _getQuestionsFromLocalStorage();
    all.push(question)
    localStorage.setItem('questions', JSON.stringify(all));
}

function _getQuestionsFromLocalStorage(){
    return JSON.parse(localStorage.getItem('questions') || '[]');
}

function _toCard(question){
    return `
        <div class="mui--text-black-54">
        ${new Date(question.date).toLocaleDateString()}
        ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>
        ${question.text}
        </div>
        <br>
    `;
}