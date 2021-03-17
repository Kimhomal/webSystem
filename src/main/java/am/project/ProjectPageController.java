package am.project;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import am.main.service.impl.AuthVO;
import am.project.service.ProjectPageService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
public class ProjectPageController {
	@Resource(name = "projectPageService")
    private ProjectPageService projectPageService;

    @RequestMapping(value = "/project/main.do")
    public String initProjectPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "main");
        return "projectPage";
    }
    
    @RequestMapping(value = "/project/create.do")
    public String createProjectPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "create");
        return "projectPage";
    }
    
    @RequestMapping(value = "/project/list.do")
    public String listProjectPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "list");
        return "projectPage";
    }

    @RequestMapping(value = "/project/detail.do", method = RequestMethod.POST)
    public String detailProjectPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	String prjId = request.getParameter("prjId");
    	model.addAttribute("prjId", prjId);
    	model.addAttribute("flag", "detail");
        return "projectPage";
    }
    
    @RequestMapping(value = "/project/modify.do", method = RequestMethod.POST)
    public String modifyProjectPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	String prjId = request.getParameter("prjId");
    	model.addAttribute("prjId", prjId);
    	model.addAttribute("flag", "modify");
        return "projectPage";
    }
    
    @RequestMapping(value = "/project/progress.do")
    public String progressProjectPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "progress");
        return "projectPage";
    }
    
    
    /**
     * 프로젝트 정보 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getProjectInfo", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getProjectInfo(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
        EgovMap result = projectPageService.getProjectInfo(params);
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("result", result);
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 프로젝트 리스트 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getProjectList", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getProjectList(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	AuthVO auth = (AuthVO) session.getAttribute("authInfo");
        String usrId = auth.getUsrId();
        String userRole = auth.getRoleCde();
        
        List<?> list;
        params.put("usrId", usrId);
        
        if(userRole.equals("R001")) {
        	list = projectPageService.getProjectListByUserId(params);
        } else if(userRole.equals("R002")) {
        	list = projectPageService.getProjectListByWoker(params);
        } else {
        	list = projectPageService.getProjectListByUserId(params);
        }
        
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("result", list);

        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 프로젝트 생성
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/create", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap createProject(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request)  throws Exception {
    	AuthVO auth = (AuthVO) session.getAttribute("authInfo");
        String usrId = auth.getUsrId();
        Integer userOrg = auth.getOrgCde();
		
        params.put("prjAdm", usrId);
        params.put("prjGrp", userOrg);
        
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	projectPageService.createProjectAndWorkers(params, request); 
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 작업자 리스트 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getWorkerListByPrjId", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getWorkerListByPrjId(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
        List<?> list = projectPageService.getWorkerListByPrjId(params);
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("result", list);
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 프로젝트 참여 업체 목록 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getCopListByPrjId", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getCopListByPrjId(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
        List<?> list = projectPageService.getCopListByPrjId(params);
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("result", list);
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 프로젝트 정보 변경
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/updateProject", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap updateProject(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	projectPageService.updateProject(params); 
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 프로젝트 진행도 조회(합산)
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getProjectProgress", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getProjectProgress(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	if(params.get("workers") != null) {
    		String wrk = (String) params.get("workers");
			String[] split = wrk.split(",");
			List<Integer> list = new ArrayList<Integer>();
			for(int i = 0; i < split.length; i++) {
				list.add(Integer.parseInt((split[i])));
			}
			params.put("workers", list);
		 }
    	
    	EgovMap info = projectPageService.getProjectInfo(params);
    	List<?> result = projectPageService.getProjectProgress(params);
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("info", info);
        jsonMap.put("result", result);
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함
        
        return model;
    }
    
    /**
     * 프로젝트 진행도 조회
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getWorkProgressByPid", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getWorkProgressByPid(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	List<?> result = projectPageService.getWorkProgressByPid(params);
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        jsonMap.put("result", result);
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함
        
        return model;
    }
    
    /**
     * 개별 작업 성과 조회
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getWorkProgressByRstId", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getWorkProgressByRstId(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	List<?> result = projectPageService.getWorkProgressByRstId(params);
        model.addAttribute("jsonView", result); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함
        
        return model;
    }
    
    /**
     * 작업 이력 조회
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getWorkHistory", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getWorkHistory(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = projectPageService.getWorkHistory(params);
    	model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 작업 이력 조회
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/deleteWorkHistory", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap deleteWorkHistory(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	HashMap<String, Object> jsonMap = new HashMap<String, Object>();
    	
    	try {
    		projectPageService.deleteWorkHistory(params);
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
    	
    	model.addAttribute("jsonView", jsonMap);
        return model;
    }
    
    /**
     * 작업자 작업 진행도 변경
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/updateProgress", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap updateProgress(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	AuthVO auth = (AuthVO) session.getAttribute("authInfo");
        String usrId = auth.getUsrId();
        
        params.put("usrId", usrId);
        
    	HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	projectPageService.updateProgress(params); 
			jsonMap.put("respFlag", "Y");
			jsonMap.put("rstId", params.get("rst_id"));
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 성과 사진 업로드
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/uploadResultImage", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap uploadResultImage(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request) throws Exception {
    	HashMap<String, Object> jsonMap = new HashMap<String, Object>();
    	
        try {
        	projectPageService.uploadResultImage(params, request); // tbl_result_repot
            jsonMap.put("respFlag", "Y");
        } catch (Exception e) {
            jsonMap.put("respFlag", "N");
        }
        
        model.addAttribute("jsonView", jsonMap); 
        
        return model;
    }
    
    /**
     * 성과 사진 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getResultImageById", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getResultImageById(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request) throws Exception {
    	EgovMap result = projectPageService.getResultImageById(params);
    	
        model.addAttribute("jsonView", result); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 성과 사진 목록 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/getResultImagesByRstId", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getResultImagesByRstId(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request) throws Exception {
    	List<?> result = projectPageService.getResultImagesByRstId(params);
    	
        model.addAttribute("jsonView", result); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 프로젝트 삭제
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/project/deleteProject", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap deleteProject(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	projectPageService.deleteProject(params); 
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
}
