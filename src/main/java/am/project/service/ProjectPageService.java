package am.project.service;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.transaction.annotation.Transactional;

import egovframework.rte.psl.dataaccess.util.EgovMap;

@Transactional
public interface ProjectPageService {
	public EgovMap getProjectInfo(HashMap<String, Object> params) throws Exception;

	public List<?> getProjectListByUserId(HashMap<String, Object> params) throws Exception;
	
	public List<?> getProjectListByWoker(HashMap<String, Object> params) throws Exception;
	
	public void createProjectAndWorkers(HashMap<String, Object> params, HttpServletRequest request) throws Exception;
	
	public List<?> getWorkerListByPrjId(HashMap<String, Object> params) throws Exception;
	
	public List<?> getCopListByPrjId(HashMap<String, Object> params) throws Exception;

	public void updateProject(HashMap<String, Object> params) throws Exception;
	
	public List<?> getProjectProgress(HashMap<String, Object> params) throws Exception;
	
	public List<?> getWorkProgressByPid(HashMap<String, Object> params) throws Exception;
	
	public List<?> getWorkProgressByRstId(HashMap<String, Object> params) throws Exception;
	
	public EgovMap getWorkHistory(HashMap<String, Object> params) throws Exception;
	
	public void deleteWorkHistory(HashMap<String, Object> params) throws Exception;
	
	public void updateProgress(HashMap<String, Object> params) throws Exception;
	
	public void uploadResultImage(HashMap<String, Object> params, HttpServletRequest request) throws Exception;
	
	// 성과 사진 가져오기
    public EgovMap getResultImageById(HashMap<String, Object> params) throws Exception;
    
	// 성과 사진 목록 가져오기
    public List<?> getResultImagesByRstId(HashMap<String, Object> params) throws Exception;
    
	public void deleteProject(HashMap<String, Object> params) throws Exception;
}
