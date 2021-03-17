package am.main;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import am.common.annotation.AuthExclude;
import am.common.web.service.StdCodeService;
import am.main.service.MainPageService;
import am.main.service.impl.AuthVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

/**
 * 메인 페이지 컨트롤러 클래스
 *
 * @author SNC
 * @version 1.0
 * @see
 * 
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2018.07.25  SNC           최초 생성
 *
 *      </pre>
 * 
 * @since 2018.07.25
 */
@Controller
public class MainPageController {
	private static final Logger logger = LoggerFactory.getLogger(MainPageController.class);

	@Resource(name = "mainPageService")
	private MainPageService mainPageService;

	@Resource(name = "stdCodeService")
	private StdCodeService stdCodeService;

	// @AuthExclude
	// @RequestMapping(value = "/index.do")
	// public String indexPage(HttpServletRequest request, HttpServletResponse
	// response, ModelMap model) throws Exception {
	//
	// return "index";
	// }

	// 로그인 전 메인페이지
	@AuthExclude
	@RequestMapping(value = "/mainPage.do")
	public String mainPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {
		return "mainPage";
	}

	// 로그인 전 메인페이지
	@AuthExclude
	@RequestMapping(value = "/loginPage.do")
	public String loginPage(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {
		return "user/login";
	}

	// 로그인 전 validation checking
	@AuthExclude
	@RequestMapping(value = "/main/loginChecking.json", method = RequestMethod.POST, produces = {
			MediaType.APPLICATION_JSON_VALUE })
	public ModelMap loginChecking(AuthVO vo, ModelMap model, HttpServletRequest request) throws Exception {
		EgovMap rtnMap = this.mainPageService.loginChecking(vo);
		return model.addAttribute("jsonView", rtnMap);
	}

	// 로그인 수행 (세션 생성)
	@AuthExclude
	@RequestMapping(value = "/main/login.do")
	public String login(AuthVO vo, ModelMap model, HttpServletRequest request) throws Exception {
		EgovMap resEgovMap = this.mainPageService.selectUserInfo(vo);
		String rootPath = request.getContextPath();
//		String returnURL = "redirect:" + rootPath + "/";
		String returnURL = "redirect:" + rootPath + "/loginPage.do";

		try {
			if (resEgovMap != null && resEgovMap.size() > 0) {
				AuthVO authVO = new AuthVO();

				authVO.setUsrId((String) resEgovMap.get("usrId"));
				authVO.setUsrNm((String) resEgovMap.get("usrNm"));
				authVO.setRoleCde((String) resEgovMap.get("roleCde"));
				authVO.setOrgCde((Integer) resEgovMap.get("orgCde"));
				authVO.setOrgNm((String) resEgovMap.get("orgNm"));
				authVO.setDptCde((String) resEgovMap.get("dptCde"));
				authVO.setDptNm((String) resEgovMap.get("dptNm"));

				logger.debug("============ 세션 생성 =============");
				logger.debug("userId : {}", authVO.getUsrId());
				logger.debug("userNm : {}", authVO.getUsrNm());
				logger.debug("organCd : {}", authVO.getOrgCde());

				HttpSession session = request.getSession();
				session.setAttribute("authInfo", authVO);

				session.setMaxInactiveInterval(60 * 120); // 2시간
				returnURL = "redirect:/main/mainPageView.do";
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

		return returnURL;
	}

	// 로그인 후 메인페이지
	@RequestMapping(value = "/main/mainPageView.do")
	public String mainPageView(AuthVO vo, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws Exception {
		return "mainPage";
	}

	// 로그아웃
	@RequestMapping(value = "/main/logout.do")
	public String logout(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String ctxPath = request.getContextPath();
		String returnURL = "redirect:" + ctxPath + "/";
		// String returnURL = "redirect:" + "/";

		request.getSession().removeAttribute("authInfo");
		request.getSession().invalidate();

		return returnURL;
	}

	@RequestMapping(value = "/main/workerListByOrg", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ModelMap workerListByOrg(@RequestParam(required=false) HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request) throws Exception {
		 AuthVO auth = (AuthVO) session.getAttribute("authInfo");
		
		 if(params.get("org") == null) {
			 List<Integer> orgCde = Arrays.asList(auth.getOrgCde());
			 params.put("orgCde", orgCde);
		 } else {
			 String org = (String) params.get("org");
			 String[] split = org.split(",");
			 List<Integer> orgCde = new ArrayList<Integer>();
			 for(int i = 0; i < split.length; i++) {
				 orgCde.add(Integer.parseInt((split[i])));
			 }
			 params.put("orgCde", orgCde);
		 }
        
		 List<?> list = this.mainPageService.workerListByOrg(params);

		 HashMap<String, Object> jsonMap = new HashMap<String, Object>();
		 jsonMap.put("result", list);

		 model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

		 return model;
    }
	
	// 회원가입
	@AuthExclude
	@RequestMapping(value = "/main/insertUserInfo.do")
	public String insertUserInfo(AuthVO vo, ModelMap modelMap, HttpServletRequest req) throws Exception {
		this.mainPageService.insertUserInfo(vo);

		modelMap.addAttribute("msg", "가입이 완료되었습니다. 관리자에게 승인요청을 하십시오.");

		return "json2View";
	}

	// 회원정보수정
	@RequestMapping(value = "/main/updateUserInfo.do")
	public String updateUserInfo(AuthVO vo, ModelMap modelMap, HttpServletRequest request) throws Exception {
		this.mainPageService.updateUserInfo(vo);

		modelMap.addAttribute("msg", "회원정보가 수정되었습니다.");

		return "json2View";
	}

	// 아이디 중복확인
	@AuthExclude
	@RequestMapping(value = "/main/uniqueUserIdCheck.do")
	public String uniqueUserIdCheck(AuthVO vo, ModelMap modelMap, HttpServletRequest request) throws Exception {
		EgovMap rtnMap = this.mainPageService.uniqueUserIdCheck(vo);
		modelMap.addAttribute("rtnMap", rtnMap);

		return "json2View";
	}
	
	@AuthExclude
	@RequestMapping(value = "/main/getCorpList", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ModelMap getCorpList(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request) throws Exception {
		 List<?> list = this.mainPageService.getCorpList(params);

		 HashMap<String, Object> jsonMap = new HashMap<String, Object>();
		 jsonMap.put("result", list);

		 model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

		 return model;
    }
	
	@AuthExclude
	@RequestMapping(value = "/main/getRoleList", method = RequestMethod.POST, produces = { MediaType.APPLICATION_JSON_VALUE })
	public ModelMap getRoleList(@RequestParam HashMap<String, Object> params, ModelMap model, HttpSession session, HttpServletRequest request) throws Exception {
		 List<?> list = this.mainPageService.getRoleList(params);

		 HashMap<String, Object> jsonMap = new HashMap<String, Object>();
		 jsonMap.put("result", list);

		 model.addAttribute("jsonView", jsonMap); // JSON으로 리턴하기 위해서는 모델키를 'jsonView'로 지정해야함

		 return model;
    }
	
	// IP 추출
	public String getClientIpAddr(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}

		return ip;
	}
}
