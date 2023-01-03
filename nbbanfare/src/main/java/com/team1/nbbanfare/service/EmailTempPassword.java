package com.team1.nbbanfare.service;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;

import jakarta.mail.Message.RecipientType;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;

public class EmailTempPassword implements EmailService{
	 @Autowired
	 JavaMailSender emailSender2;
	 
//	    public static final String ePw = createKey();
	    private String ePw = "";
	    private MimeMessage createMessage(String to) throws Exception{
	        System.out.println("보내는 대상 : "+ to);
	        System.out.println("인증 번호 : "+ePw);
	        MimeMessage  message = emailSender2.createMimeMessage();
	 
	        message.addRecipients(RecipientType.TO, to);//보내는 대상
	        message.setSubject("임시비밀번호");//제목
	 
	        String msgg="";
	        msgg+= "<div style='margin:20px;'>";
	        msgg+= "<h1> 안녕하세요 N빵파레입니다. </h1>";
	        msgg+= "<br>";
	        msgg+= "<p>임시비밀 번호입니다.<p>";
	        msgg+= "<br>";
	        msgg+= "<p>감사합니다.<p>";
	        msgg+= "<br>";
	        msgg+= "<div align='center' style='border:1px solid black; font-family:verdana';>";
	        msgg+= "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
	        msgg+= "<div style='font-size:130%'>";
	        msgg+= "<strong>";
	        msgg+= ePw+"</strong><div><br/> ";
	        msgg+= "</div>";
	        message.setText(msgg, "utf-8", "html");//내용
	        message.setFrom(new InternetAddress("minhyeok562@gmail.com","N빵파레"));//보내는 사람
	 
	        return message;
	    }
	 
	    public static String createKey() {
	        StringBuffer key = new StringBuffer();
	        Random rnd = new Random();
	 
	        for (int i = 0; i < 8; i++) { // 인증코드 8자리
	            int index = rnd.nextInt(3); // 0~2 까지 랜덤
	 
	            switch (index) {
	                case 0:
	                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
	                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
	                    break;
	                case 1:
	                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
	                    //  A~Z
	                    break;
	                case 2:
	                    key.append((rnd.nextInt(10)));
	                    // 0~9
	                    break;
	            }
	        }
	        return key.toString();
	    }

	    @Override
	    public String sendSimpleMessage(String to) throws Exception {
	    	ePw = createKey();
	        MimeMessage message = createMessage(to);
	        try{//예외처리
	            emailSender2.send(message);
	        }catch(MailException es){
	            es.printStackTrace();
	            throw new IllegalArgumentException();
	        }
	        return ePw;
	    }

}
