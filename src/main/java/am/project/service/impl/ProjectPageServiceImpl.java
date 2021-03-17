package am.project.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import am.common.paging.PagingInfo;
import am.common.util.com.ComDateUtils;
import am.common.util.com.FileUtil;
import am.project.service.ProjectPageMapper;
import am.project.service.ProjectPageService;
import egovframework.com.cmm.service.EgovProperties;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("projectPageService")
public class ProjectPageServiceImpl implements ProjectPageService {
	@Resource(name = "projectPageMapper")
	ProjectPageMapper projectPageMapper;
	
	@Override
	public EgovMap getProjectInfo(HashMap<String, Object> params) throws Exception {
		return projectPageMapper.getProjectInfo(params);
	}
	
	// 프로젝트 조회
    @Override
    public List<?> getProjectListByUserId(HashMap<String, Object> params) throws Exception {
        return projectPageMapper.getProjectListByUserId(params);
    }
    
    // 프로젝트 조회
    @Override
    public List<?> getProjectListByWoker(HashMap<String, Object> params) throws Exception {
        return projectPageMapper.getProjectListByWoker(params);
    }
    
	@Override
	public void createProjectAndWorkers(HashMap<String, Object> params, HttpServletRequest request) throws Exception {
		String workers = params.get("workers").toString();
		String[] workerList = workers.split(",");
		
		String cops = params.get("cops").toString();
		String[] copList = cops.split(",");
		
		String workOpt = params.get("wrkOpt").toString();
		JSONParser jsonParser = new JSONParser();
		JSONArray jsonArray = (JSONArray)jsonParser.parse(workOpt);
		JSONArray prgOpt = new JSONArray();
		
		for(int i = 0; i < jsonArray.size(); i++) {
			JSONObject jsonObject = (JSONObject) jsonArray.get(i);
			JSONObject temp = new JSONObject();
			temp.put("key", jsonObject.get("key"));
			temp.put("value", 0);
			prgOpt.add(temp);
		}
		
		params.put("prgOpt", prgOpt.toString());
		
		try {
			projectPageMapper.createProject(params); // tbl_result_repot
        } catch (Exception e) {
        	return;
        } finally {
        	Integer prjId = (Integer) params.get("prj_id");
        	
        	for(int i = 0; i < workerList.length; i++) {
        		HashMap<String, Object> workerParam = new HashMap<String, Object>();
        		workerParam.put("prjId", prjId);
        		workerParam.put("usrId", workerList[i]);
        		projectPageMapper.createWorker(workerParam); 
        	}
        	
        	for(int i = 0; i < copList.length; i++) {
        		HashMap<String, Object> copParam = new HashMap<String, Object>();
        		copParam.put("prjId", prjId);
        		copParam.put("copId", copList[i]);
        		projectPageMapper.addCopToProject(copParam); 
        	}
        	
//        	JSONParser jsonParser = new JSONParser();
//            JSONArray jsonArray = (JSONArray) jsonParser.parse(workers);
//            for(int i = 0; i < jsonArray.size(); i++) {
//            	HashMap<String, Object> workerParam = new HashMap<String, Object>();
//            	JSONObject jsonObject = (JSONObject) jsonArray.get(i);
//            	JSONArray workerList = (JSONArray) jsonObject.get("workers");
//            	
//            	workerParam.put("prjId", prjId);
//            	
//            	for(int j = 0; j < workerList.size(); j++) {
//            		workerParam.put("usrId", workerList.get(j));
//            		try {
//            			projectPageMapper.createWorker(workerParam); 
//            		} catch (Exception e) {
//            			return;
//            		}
//            	}
//            }
        }
	}
	
    @Override
    public List<?> getWorkerListByPrjId(HashMap<String, Object> params) throws Exception {
        return projectPageMapper.getWorkerListByPrjId(params);
    }
    
    @Override
    public List<?> getCopListByPrjId(HashMap<String, Object> params) throws Exception {
        return projectPageMapper.getCopListByPrjId(params);
    }
    
    @Override
	public void updateProject(HashMap<String, Object> params) throws Exception {
    	String workers = params.get("workers").toString();
		String[] workerList = workers.split(",");
    	
		String cops = params.get("cops").toString();
		String[] copList = cops.split(",");
		
//		projectPageMapper.deleteWorkerByPrjId(params);
		projectPageMapper.updateProjectInfo(params);
		
		for(int i = 0; i < workerList.length; i++) {
			if(workerList[i].equals("")) {
				continue;
			}
    		HashMap<String, Object> workerParam = new HashMap<String, Object>();
    		workerParam.put("prjId", params.get("prjId"));
    		workerParam.put("usrId", workerList[i]);
    		projectPageMapper.createWorker(workerParam); 
    	}
		
		for(int i = 0; i < copList.length; i++) {
			if(copList[i].equals("")) {
				continue;
			}
    		HashMap<String, Object> copParam = new HashMap<String, Object>();
    		copParam.put("prjId", params.get("prjId"));
    		copParam.put("copId", copList[i]);
    		projectPageMapper.addCopToProject(copParam); 
    	}
	}
    
    @Override
    public List<?> getProjectProgress(HashMap<String, Object> params) throws Exception {
		return projectPageMapper.getProjectProgress(params);
	}
    
    @Override
    public List<?> getWorkProgressByPid(HashMap<String, Object> params) throws Exception {
		return projectPageMapper.getWorkProgressByPid(params);
	}
    
    @Override
    public List<?> getWorkProgressByRstId(HashMap<String, Object> params) throws Exception {
    	return projectPageMapper.getWorkProgressByRstId(params);
    }
    
    @Override
    public EgovMap getWorkHistory(HashMap<String, Object> params) throws Exception {
    	PagingInfo pagingInfo = new PagingInfo(params);
    	pagingInfo.setAttr("prjId", params.get("prjId"));
    	
    	EgovMap result = new EgovMap();
		int count = projectPageMapper.getCountWorkHistory(params);
		List<?> list = projectPageMapper.getWorkHistory(pagingInfo);
		int draw = pagingInfo.getDrawCount();
		
		result.put("draw", draw);
		result.put("recordsTotal", count);
		result.put("recordsFiltered", count);
		result.put("data", list);
		
		return result;
    }
    
    @Override
	public void deleteWorkHistory(HashMap<String, Object> params) throws Exception {
    	List<?> files = projectPageMapper.getResultImagesByRstId(params);
    	for(int i = 0; i < files.size(); i++) {
    		EgovMap item = (EgovMap) files.get(i);
    		String filePath = (String) item.get("filePath");
    		FileUtil.rmFile(filePath);
    	}
    	
		try {
			projectPageMapper.deleteWorkHistory(params);
        } catch (Exception e) {
        	return;
        }
	}
    @Override
	public void updateProgress(HashMap<String, Object> params) throws Exception {
    	String progress = (String)params.get("prgOpt");
    	EgovMap projectInfo = projectPageMapper.getProjectInfo(params);
    	String target = (String) projectInfo.get("wrkOpt");
    	
    	JSONParser jsonParser = new JSONParser();
    	
    	JSONArray progressArr = (JSONArray) jsonParser.parse(progress);
    	JSONArray targetArr = (JSONArray) jsonParser.parse(target);
    	
    	projectPageMapper.insertWorkResult(params);
    	for(int i = 0; i < progressArr.size(); i++) {
			JSONObject progressObject = (JSONObject) progressArr.get(i);
			
			for(int j = 0; j < targetArr.size(); j++) {
				JSONObject targetObject = (JSONObject) targetArr.get(j);
				
				if(progressObject.get("key").equals(targetObject.get("key"))) {
					params.put("optKey", progressObject.get("key"));
					params.put("optVal", progressObject.get("value"));
					projectPageMapper.insertProgress(params);
					break;
				}
			}
		}
	}
    
    @Override
	public void uploadResultImage(HashMap<String, Object> params, HttpServletRequest request) throws Exception {
		final Map<String, MultipartFile> files = ((MultipartHttpServletRequest) request).getFileMap();
        Iterator<Map.Entry<String, MultipartFile>> itr = files.entrySet().iterator();
        int fileNo = 0;
        while (itr.hasNext()) {
            String saveFileName = "IMAGE" + ComDateUtils.getCurDate("yyMMddHHmmss") + fileNo;
            fileNo++;
            Entry<String, MultipartFile> fileEntry = itr.next();
            String FilePath = FileUtil.writeFileSave(fileEntry, saveFileName, EgovProperties.getProperty("Globals.fileStorePath") + "/RESULTIMAGE");

            params.put("fileNm", fileEntry.getValue().getOriginalFilename());
            params.put("svFileNm", saveFileName);
            params.put("filePath", FilePath);

            projectPageMapper.uploadResultImage(params);
        }
	}
    
    @Override
    public EgovMap getResultImageById(HashMap<String, Object> params) throws Exception {
    	EgovMap result = projectPageMapper.getResultImageById(params);
		String base64 = FileUtil.toBase64(result);
		result.put("base64", base64);
    	
    	return result;
    }
    
    @Override
    public List<?> getResultImagesByRstId(HashMap<String, Object> params) throws Exception {
    	return projectPageMapper.getResultImagesByRstId(params);
    }
    
    @Override
    public void deleteProject(HashMap<String, Object> params) throws Exception {
		projectPageMapper.deleteProject(params);
	}
}
