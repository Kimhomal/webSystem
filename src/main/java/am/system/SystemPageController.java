package am.system;

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
import am.system.service.SystemPageService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Controller
public class SystemPageController {
	@Resource(name="systemPageService")
	SystemPageService systemPageService;
	
    @RequestMapping(value = "/system/main.do")
    public String initSystemPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "main");
        return "systemPage";
    }
    
    @RequestMapping(value = "/system/company.do")
    public String companySystemPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "company");
        return "systemPage";
    }
    
    @RequestMapping(value = "/system/options.do")
    public String optionsSystemPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "options");
        return "systemPage";
    }
    
    @RequestMapping(value = "/system/user.do")
    public String userSystemPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model) throws Exception {
    	model.addAttribute("flag", "user");
        return "systemPage";
    }
    
    /**
     * 업체 리스트 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/getCorpList", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getCorpList(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = systemPageService.getCorpList(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 업체명 중복 검사
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/dupCorpNameCheck", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap dupCorpNameCheck(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = systemPageService.dupCorpNameCheck(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 업체 생성
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/createCorp", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap createProject(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request)  throws Exception {
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	systemPageService.createCorp(params); 
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 사용자 리스트 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/getUserList", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getUserList(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = systemPageService.getUserList(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 승인대기 사용자 리스트 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/getWaitUserList", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getWaitUserList(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = systemPageService.getWaitUserList(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 작업 옵션 리스트 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/getOptions", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getOptions(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	List<?> result = systemPageService.getOptions(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 작업 옵션 Datatable 가져오기
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/getOptionsDatatable", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap getOptionsDatatable(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = systemPageService.getOptionsDatatable(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 작업코드 중복 검사
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/dupOptionCheck", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap dupOptionCheck(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session) throws Exception {
    	EgovMap result = systemPageService.dupOptionCheck(params);
        model.addAttribute("jsonView", result);
        return model;
    }
    
    /**
     * 작업 옵션 생성
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/createOption", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap createOption(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request)  throws Exception {
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	systemPageService.createOption(params); 
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
    
    /**
     * 작업 옵션 삭제
     *
     * @param params
     * @param model
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/system/deleteOption", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
    public ModelMap deleteOption(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request)  throws Exception {
        HashMap<String, Object> jsonMap = new HashMap<String, Object>();
        
        try {
        	systemPageService.deleteOption(params); 
			jsonMap.put("respFlag", "Y");
		} catch (Exception e) {
			jsonMap.put("respFlag", "N");
		}
        
        model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

        return model;
    }
}
