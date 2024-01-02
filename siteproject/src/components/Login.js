import {useForm} from "react-hook-form"
import "../styles/signup.css"


export default function Login(){

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch
    }= useForm();

    const onValid = (data) => {
        
        alert("로그인 성공")
       
        console.log("성공 ", data)
    }

    const onInvalid = (error) => {
        console.log("실패 ", error)
    }



    return(
        <>
        <div className="signup_outside">

            <h2 className="titleWrap">로그인</h2>

                <div className="contentWrap">
                    <form onSubmit={handleSubmit(onValid, onInvalid)}>
                    <div className="forminsideWrap">
                    

                    <div className="inputTitle">
                    <i className="fa-solid fa-envelope"></i>
                                        이메일</div>
                    <div className="inputWrap">


                        <input
                            className="signup_input"
                            type="email"
                            // value={email}
                            placeholder="ex) whitening@google.com"
                            // onChange={(e)=>setEmail(e.target.value)}
                            {...register("email", {
                                required: "이메일은 필수값입니다.",
                                pattern: {
                                value:
                                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/, // 정규식 지정
                                message: "올바른 형태의 이메일을 입력해주세요.", // 정규식을 만족하지 못했을 때, 발생시키는 오류 메세지
                                },
                            })}
                        />
                    </div>
                            {errors.email  && (
                            <div style={{ color: "red", fontSize:"11px", paddingTop:"3px" }}>{errors.email.message}</div>
                            )}                

                    <br />


                    

                    <div className="inputTitle">
                    <i className="fa-solid fa-lock"></i>
                        비밀번호</div>
                    <div className="inputWrap">

                        <input 
                            className="signup_input"
                            type="password"
                            // value={pw}
                            placeholder="비밀번호"
                            // onChange={(e)=>setPw(e.target.value)}
                            {...register("pw",
                            {required : "비밀번호는 필수값입니다.",
                            pattern: {
                                value: /^[a-zA-Z0-9]{4,12}$/,
                                message:"4자리 이상 12자리 이하, 알파벳, 숫자를 포함해 아이디를 만들어주세요. "
                                }
                            })}
                        >
                        </input>
                    </div>
                        {errors.pw && (
                            <div style={{ color: "red", fontSize:"11px", paddingTop:"3px" }}>{errors.pw.message}</div>
                            )}                
                    <br />
                        
                    </div>
                    <br />
                    <button className="btn-signup" type="submit">Login !</button>
                    </form>
                </div>


        </div>
        </>
    )
};