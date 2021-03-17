package am.main.service.impl;

import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Mapper("mainPageMapper")
public interface MainPageMapper {
    // 아이디, 패스워드 존재 유무 체크
    EgovMap selectLoginUserInfo(AuthVO vo) throws Exception;

    // 사용자 정보 조회
    EgovMap selectUserInfo(AuthVO vo) throws Exception;

    // 회원가입
    void insertUserInfo(AuthVO vo) throws Exception;

    // 회원정보수정
    void updateUserInfo(AuthVO vo) throws Exception;
    
    // 그룹별 작업자 목록
    public List<?> workerListByOrg(HashMap<String, Object> params) throws Exception;

    // 아이디 중복확인
    String uniqueUserIdCheck(AuthVO vo) throws Exception;

    // 시스템 접근로그
    void insertConnectStat(@Param("mnuCd") String mnuCd, @Param("userId") String userId, @Param("ipAddr") String ipAddr) throws Exception;

    // 비밀번호 변경
    void pwdChange(AuthVO vo) throws Exception;
    
    // 업체 목록 조회
    public List<?> getCorpList(HashMap<String, Object> params) throws Exception;
    
    // 권한 목록 조회
    public List<?> getRoleList(HashMap<String, Object> params) throws Exception;
}
