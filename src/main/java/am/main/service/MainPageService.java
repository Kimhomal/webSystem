package am.main.service;

import am.main.service.impl.AuthVO;
import egovframework.rte.psl.dataaccess.util.EgovMap;

import java.util.HashMap;
import java.util.List;

public interface MainPageService {
    // 로그인 전 validation checking
    EgovMap loginChecking(AuthVO vo) throws Exception;

    // 사용자 정보 조회
    EgovMap selectUserInfo(AuthVO vo) throws Exception;
    
    // 회원가입
    void insertUserInfo(AuthVO vo) throws Exception;
    
    // 그룹별 작업자 목록
    public List<?> workerListByOrg(HashMap<String, Object> params) throws Exception;
    
    // 아이디 중복확인
    EgovMap uniqueUserIdCheck(AuthVO vo) throws Exception;

    // 회원정보수정
    void updateUserInfo(AuthVO vo) throws Exception;

    // 비밀번호 변경
    void pwdChange(AuthVO vo) throws Exception;
    
    // 업체 목록 조회
    public List<?> getCorpList(HashMap<String, Object> params) throws Exception;
    
    // 권한 목록 조회
    public List<?> getRoleList(HashMap<String, Object> params) throws Exception;
}
