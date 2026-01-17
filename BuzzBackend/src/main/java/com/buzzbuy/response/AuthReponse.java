package com.buzzbuy.response;

public class AuthReponse {

	private String jwt;
	private String msg;
	
	public AuthReponse(String jwt, String msg) {
		this.jwt = jwt;
		this.msg = msg;
	}

	public AuthReponse() {
		super();
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	
}
