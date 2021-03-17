package am.project.service;

import java.util.HashMap;
import java.util.List;

import am.common.paging.PagingInfo;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Mapper("projectPageMapper")
public interface ProjectPageMapper {
	public EgovMap getProjectInfo(HashMap<String, Object> params) throws Exception;
	
	public List<?> getProjectListByUserId(HashMap<String, Object> params) throws Exception;
	
	public List<?> getProjectListByWoker(HashMap<String, Object> params) throws Exception;
	
	public void createProject(HashMap<String, Object> params) throws Exception;
	
	public void createWorker(HashMap<String, Object> params) throws Exception;
	
	public void addCopToProject(HashMap<String, Object> params) throws Exception;
	
	public List<?> getWorkerListByPrjId(HashMap<String, Object> params) throws Exception;
	
	public List<?> getCopListByPrjId(HashMap<String, Object> params) throws Exception;
	
	public void deleteWorkerByPrjId(HashMap<String, Object> params) throws Exception;
	
	public void updateProjectInfo(HashMap<String, Object> params) throws Exception;
	
	public List<?> getProjectProgress(HashMap<String, Object> params) throws Exception;
	
	public List<?> getWorkProgressByPid(HashMap<String, Object> params) throws Exception;
	
	public List<?> getWorkProgressByRstId(HashMap<String, Object> params) throws Exception;
	
	public List<?> getWorkHistory(PagingInfo pagingInfo) throws Exception;
	
	public void deleteWorkHistory(HashMap<String, Object> params) throws Exception;
	
	public int getCountWorkHistory(HashMap<String, Object> params) throws Exception;
	
	public void insertWorkResult(HashMap<String, Object> params) throws Exception;
	
	public void insertProgress(HashMap<String, Object> params) throws Exception;
	
	public void uploadResultImage(HashMap<String, Object> params) throws Exception;
	
	public EgovMap getResultImageById(HashMap<String, Object> params) throws Exception;
	
	public List<?> getResultImagesByRstId(HashMap<String, Object> params) throws Exception;
	
	public void deleteProject(HashMap<String, Object> params) throws Exception;
	
	public void deleteProjectCops(HashMap<String, Object> params) throws Exception;
}
