import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';

function App() {
    const [length , setLength] = useState(8)
    const [numberAllowed , setnumberAllowed] = useState(false)
    const [charAllowed , setcharAllowed] = useState(false)
    const [password , setPassword] = useState('')

    const passwordRef = useRef(null)

    const handlecharchange = ()=>{
        setcharAllowed(!charAllowed)
    }

    const handlenumbchange = ()=>{
        setnumberAllowed(!numberAllowed)
    }

    const passwordGenerator = useCallback(()=>{
        let pass = ''
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        if(numberAllowed){
            str += '1234567890'
        }
        if(charAllowed){
            str += '!@#$%^&*()_+'
        }

        for (let i = 1; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)
            pass += str.charAt(char)
        }
        setPassword(pass)
    },[length,numberAllowed,charAllowed,setPassword])

    const copyClipboard = useCallback(()=>{
        window.navigator.clipboard.writeText(password)
    },[password])

    const fortoast = ()=>{
        toast.success('Copied')
    }

    useEffect(()=>{
        passwordGenerator()
    },[charAllowed,numberAllowed,passwordGenerator,length])

  return (
    <>
      <div className="main-box">
                <h1 className='text-white text-center text-5xl'>Password Generator</h1>
                <div className="box bg-slate-600 shadow-md">
                    <div className="inputbox">
                        <input type="text" value={password} placeholder='password' ref={passwordRef}  readOnly className='bg-white' />
                        <button  className=' bg-blue-600' onClick={()=>{copyClipboard(),fortoast()}}>Copy</button>
                        <Toaster/>
                    </div>
                    <div className="option">
                        <div className="rangeBox cursor-pointer">
                            <input type="range" max={100} min={6} value={length} onChange={(e)=>{
                                setLength(e.target.value)
                            }}  />
                            <label>Length ({length})</label>
                        </div>
                        <div className="numberCheckbox">
                            <input type="checkbox" name="number" id="number" 
                            onChange={handlenumbchange} />
                            <label htmlFor="number">Number</label>
                        </div>
                        <div className="characterCheckbox">
                            <input type="checkbox" name="character" id="character"
                            onChange={handlecharchange} />
                            <label htmlFor="character">Character</label>
                        </div>
                    </div>
                </div>
            </div>
    </>
  )
}

export default App
