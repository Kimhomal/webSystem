package am.system.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Transactional
public interface SystemPageService {
	public EgovMap getCorpList(HashMap<String, Object> params) throws Exception;
	
	public EgovMap dupCorpNameCheck(HashMap<String, Object> params) throws Exception;
	
	public void createCorp(HashMap<String, Object> params) throws Exception;
	
	public EgovMap getUserList(HashMap<String, Object> params) throws Exception;
	
	public EgovMap getWaitUserList(HashMap<String, Object> params) throws Exception;
	
	public List<?> getOptions(HashMap<String, Object> params) throws Exception;
	
	public EgovMap getOptionsDatatable(HashMap<String, Object> params) throws Exception;
	
	public EgovMap dupOptionCheck(HashMap<String, Object> params) throws Exception;
	
	public void createOption(HashMap<String, Object> params) throws Exception;
	
	public void deleteOption(HashMap<String, Object> params) throws Exception;
}
