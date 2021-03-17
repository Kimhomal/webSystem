package am.main.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import am.main.service.MainPageService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("mainPageService")
public class MainPageServiceImpl implements MainPageService {
    @Resource(name = "mainPageMapper")
    MainPageMapper mainPageMapper;

    @Override
    public EgovMap loginChecking(AuthVO vo) throws Exception {
        // 아이디, 패스워드 존재 유무 체크
        EgovMap resultMap = this.mainPageMapper.selectLoginUserInfo(vo);

        String rtnMsg = "";
        EgovMap rtnMap = new EgovMap();

        label:
        {
        	if ("Y".equals(resultMap.get("idFlag").toString()) 
        			&& "Y".equals(resultMap.get("pwdFlag").toString())
        			&& "Y".equals(resultMap.get("accFlag").toString())) {
        		rtnMsg = "로그인 되었습니다.";
                rtnMap.put("sof", "success");
                rtnMap.put("msg", rtnMsg);
        	} else {
        		if ("N".equals(resultMap.get("idFlag").toString())) {
                    rtnMsg = "입력하신 ID 가 맞지 않습니다.";
                    rtnMap.put("sof", "fail");
                    rtnMap.put("msg", rtnMsg);
                    break label;
                }
                if ("N".equals(resultMap.get("pwdFlag").toString())) {
                    rtnMsg = "입력하신 패스워드가 맞지 않습니다.";
                    rtnMap.put("sof", "fail");
                    rtnMap.put("msg", rtnMsg);
                    break label;
                }
                if("N".equals(resultMap.get("accFlag").toString())) {
                	rtnMsg = "아직 승인되지않은 계정입니다. 관리자에게 승인을 요청하세요.";
                    rtnMap.put("sof", "fail");
                    rtnMap.put("msg", rtnMsg);
                    break label;
                }
        	}
        }

        return rtnMap;
    }

    // 사용자 정보 조회
    @Override
    public EgovMap selectUserInfo(AuthVO vo) throws Exception {
        return this.mainPageMapper.selectUserInfo(vo);
    }

    // 회원가입
    @Override
    public void insertUserInfo(AuthVO vo) throws Exception {
    	vo.setAccYn("N");
        this.mainPageMapper.insertUserInfo(vo);
    }

    // 그룹별 작업자 목록
    @Override
    public List<?> workerListByOrg(HashMap<String, Object> params) throws Exception {
        return this.mainPageMapper.workerListByOrg(params);
    }
    
    // 회원정보수정
    @Override
    public void updateUserInfo(AuthVO vo) throws Exception {
        this.mainPageMapper.updateUserInfo(vo);
    }

    // 아이디 중복확인
    @Override
    public EgovMap uniqueUserIdCheck(AuthVO vo) throws Exception {
        String rtnStr = this.mainPageMapper.uniqueUserIdCheck(vo);

        EgovMap rtnMap = new EgovMap();

        if (rtnStr != null) {
            rtnMap.put("msg", "아이디가 존재합니다.");
            rtnMap.put("flag", false);
        }else{
            rtnMap.put("msg", "사용가능한 아이디 입니다.");
            rtnMap.put("flag", true);
        }

        return rtnMap;
    }

    @Override
    public void pwdChange(AuthVO vo) throws Exception {
        this.mainPageMapper.pwdChange(vo);
    }
    
    // 업체 목록 조회
    @Override
    public List<?> getCorpList(HashMap<String, Object> params) throws Exception {
    	return this.mainPageMapper.getCorpList(params);
    }
    
    // 권한 목록 조회
    @Override
    public List<?> getRoleList(HashMap<String, Object> params) throws Exception {
    	return this.mainPageMapper.getRoleList(params);
    }
}
