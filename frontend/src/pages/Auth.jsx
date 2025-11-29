import React, {useState} from 'react';
import { BASE } from '../utils/api';
import { useNavigate } from 'react-router-dom';

export default function Auth(){
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(){
    const url = `${BASE}/api/auth/${isLogin ? 'login' : 'register'}`;
    const res = await fetch(url, {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(isLogin ? { email, password } : { name, email, password })
    }).then(r=>r.json());
    if (res.token) {
      localStorage.setItem('token', res.token);
      navigate('/');
    } else {
      alert(res.msg || 'Error');
    }
  }

  return (
    <div style={{padding:20}}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {!isLogin && <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)}/>}
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
      <button onClick={submit}>{isLogin ? 'Login' : 'Register'}</button>
      <p onClick={()=>setIsLogin(v=>!v)} style={{cursor:'pointer'}}>{isLogin ? 'Create account' : 'Have an account? Login'}</p>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> be50ace (Initial commit)
