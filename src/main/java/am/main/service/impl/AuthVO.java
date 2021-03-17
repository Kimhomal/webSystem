package am.main.service.impl;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

public class AuthVO 
{
	private String searchUserId;
	private String searchUserPwd;
	
	private String usrId;
	private String usrNm;
	private String usrPwd;
	private String roleCde;
	private Integer orgCde;
	private String dptCde;
	private String orgNm;
	private String dptNm;
	private String accYn;
	
	public String getSearchUserId() {
		return searchUserId;
	}
	public void setSearchUserId(String searchUserId) {
		this.searchUserId = searchUserId;
	}
	public String getSearchUserPwd() {
		return searchUserPwd;
	}
	public void setSearchUserPwd(String searchUserPwd) {
		this.searchUserPwd = searchUserPwd;
	}
	public String getUsrId() {
		return usrId;
	}
	public void setUsrId(String usrId) {
		this.usrId = usrId;
	}
	public String getUsrNm() {
		return usrNm;
	}
	public void setUsrNm(String usrNm) {
		this.usrNm = usrNm;
	}
	public String getUsrPwd() {
		return usrPwd;
	}
	public void setUsrPwd(String usrPwd) {
		this.usrPwd = usrPwd;
	}
	public String getRoleCde() {
		return roleCde;
	}
	public void setRoleCde(String roleCde) {
		this.roleCde = roleCde;
	}
	public Integer getOrgCde() {
		return orgCde;
	}
	public void setOrgCde(Integer orgCde) {
		this.orgCde = orgCde;
	}
	public String getDptCde() {
		return dptCde;
	}
	public void setDptCde(String dptCde) {
		this.dptCde = dptCde;
	}
	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
	}
	public String getOrgNm() {
		return orgNm;
	}
	public void setOrgNm(String orgNm) {
		this.orgNm = orgNm;
	}
	public String getDptNm() {
		return dptNm;
	}
	public void setDptNm(String dptNm) {
		this.dptNm = dptNm;
	}
	public String getAccYn() {
		return accYn;
	}
	public void setAccYn(String accYn) {
		this.accYn = accYn;
	}

}
