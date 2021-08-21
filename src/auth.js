export function getAuthForm(){
    return `
         <form class="mui-form" id="auth-form">
                <div class="mui-textfield mui-textfield--float-label">
                  <input type="email" id="email">
                  <label for="email">Email</label>
                </div>
                <div class="mui-textfield mui-textfield--float-label">
                  <input type="password" id="password" required>
                  <label for="password">Password</label>
                </div>
                <button 
                    type="submit"
                    class="mui-btn mui-btn--raised mui-btn--primary">
                    Log In
                    </button>
         </form>
    `;
}

export function authWithEmailAndPassword(email,password){
    const apiKey = 'AIzaSyDJVqkBHPmStm8wByAWdkQ2N6-NI-ZahhY';
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,{
        method: 'POST',
        body: JSON.stringify({email: email, password: password, returnSecureToken: true}),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
       return data.idToken;
    });
}