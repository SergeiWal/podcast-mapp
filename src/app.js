import './style.css'
import { isValid } from './util';
import {createModal} from './util';
import { Question } from './question';
import { authWithEmailAndPassword, getAuthForm } from './auth';

const form = document.getElementById('form');
const modal = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const submit = form.querySelector('#submit');


form.addEventListener('submit',submitFormHandler);
modal.addEventListener('click', _openModal);
window.addEventListener('load',Question.renderList);
input.addEventListener('input',(event)=>{
    submit.disabled =  !isValid(input.value);
});

function submitFormHandler(event){
    event.preventDefault();
    if(isValid(input.value)){
        const question ={
            text: input.value.trim(),
            date: new Date().toJSON(),
        }

        submit.disabled = true;
        //request to server to save question
        Question.create(question).then(()=>{
            console.log('Question', question);
            input.value = '';
            input.className = '';
        });
        //submit.disabled = false;
    }
}

function _authFormHandler(event){
    event.preventDefault();

    const btn = event.target.querySelector('button');
    const email = event.target.querySelector('#email').value;
    const pass = event.target.querySelector('#password').value;

    btn.disabled = true;
    authWithEmailAndPassword(email, pass)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(()=>{
            btn.disabled = false;
        });
}

function  _openModal(){
    createModal('Autorization', getAuthForm());
    document
        .getElementById('auth-form')
        .addEventListener('submit',_authFormHandler,{onse:true});
}

function renderModalAfterAuth(content){
    if(typeof content === 'string'){
        createModal('Error', content)
    }else{
        createModal('Questions List', Question.listToHTML(content));
    }
}