package am.system.service.impl;

import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import am.common.paging.PagingInfo;
import am.system.service.SystemPageMapper;
import am.system.service.SystemPageService;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Service("systemPageService")
public class SystemPageServiceImpl implements SystemPageService {
	@Resource(name="systemPageMapper")
	SystemPageMapper systemPageMapper;
	
	@Override
	public EgovMap getCorpList(HashMap<String, Object> params) throws Exception{
		PagingInfo pagingInfo = new PagingInfo(params);
		
		EgovMap result = new EgovMap();
		int count = systemPageMapper.getCountCorpList(pagingInfo);
		List<?> list = systemPageMapper.getCorpList(pagingInfo);
		int draw = pagingInfo.getDrawCount();
		
		result.put("draw", draw);
		result.put("recordsTotal", count);
		result.put("recordsFiltered", count);
		result.put("data", list);
		
		return result;
	}
	
	@Override
	public EgovMap dupCorpNameCheck(HashMap<String, Object> params) throws Exception{
		EgovMap result = systemPageMapper.getCorpByName(params);
		EgovMap msg = new EgovMap();
		
        if (result != null) {
        	msg.put("msg", "업체명이 존재합니다.");
        	msg.put("flag", false);
        }else{
        	msg.put("msg", "사용가능한 업체명입니다.");
        	msg.put("flag", true);
        }

        return msg;
	}
	
	@Override
	public void createCorp(HashMap<String, Object> params) throws Exception {
		try {
			systemPageMapper.createCorp(params); // tbl_result_repot
        } catch (Exception e) {
        	return;
        }
	}
	
	@Override
	public EgovMap getUserList(HashMap<String, Object> params) throws Exception{
		PagingInfo pagingInfo = new PagingInfo(params);
		
		EgovMap result = new EgovMap();
		int count = systemPageMapper.getCountUserList(pagingInfo);
		List<?> list = systemPageMapper.getUserList(pagingInfo);
		int draw = pagingInfo.getDrawCount();
		
		// 권한, 소속 한글화
		for(int i = 0; i < list.size(); i++) {
			EgovMap temp = (EgovMap) list.get(i);
			HashMap<String, Object> corpParam = new HashMap<>();
			HashMap<String, Object> roleParam = new HashMap<>();
			
			corpParam.put("id", temp.get("orgCde"));
			roleParam.put("id", temp.get("roleCde"));
			
			EgovMap corp = systemPageMapper.getCorpById(corpParam);
			EgovMap role = systemPageMapper.getRoleById(roleParam);
			
			temp.put("orgCde", corp.get("copNm"));
			temp.put("roleCde", role.get("roleNm"));
		}
				
		result.put("draw", draw);
		result.put("recordsTotal", count);
		result.put("recordsFiltered", count);
		result.put("data", list);
		
		return result;
	}
	
	@Override
	public EgovMap getWaitUserList(HashMap<String, Object> params) throws Exception{
		PagingInfo pagingInfo = new PagingInfo(params);
		
		EgovMap result = new EgovMap();
		int count = systemPageMapper.getCountWaitUserList(pagingInfo);
		List<?> list = systemPageMapper.getWaitUserList(pagingInfo);
		int draw = pagingInfo.getDrawCount();
		
		// 권한, 소속 한글화
		for(int i = 0; i < list.size(); i++) {
			EgovMap temp = (EgovMap) list.get(i);
			HashMap<String, Object> corpParam = new HashMap<>();
			HashMap<String, Object> roleParam = new HashMap<>();
			
			corpParam.put("id", temp.get("orgCde"));
			roleParam.put("id", temp.get("roleCde"));
			
			EgovMap corp = systemPageMapper.getCorpById(corpParam);
			EgovMap role = systemPageMapper.getRoleById(roleParam);
			
			temp.put("orgCde", corp.get("copNm"));
			temp.put("roleCde", role.get("roleNm"));
		}
		
		result.put("draw", draw);
		result.put("recordsTotal", count);
		result.put("recordsFiltered", count);
		result.put("data", list);
		
		return result;
	}
	
	@Override
	public List<?> getOptions(HashMap<String, Object> params) throws Exception{
		return systemPageMapper.getOptions(params);
	}
	
	@Override
	public EgovMap getOptionsDatatable(HashMap<String, Object> params) throws Exception{
		PagingInfo pagingInfo = new PagingInfo(params);
		
		EgovMap result = new EgovMap();
		int count = systemPageMapper.getCountOptions(pagingInfo);
		List<?> list = systemPageMapper.getOptionsDatatable(pagingInfo);
		int draw = pagingInfo.getDrawCount();
		
		result.put("draw", draw);
		result.put("recordsTotal", count);
		result.put("recordsFiltered", count);
		result.put("data", list);
		
		return result;
	}
	
	@Override
	public EgovMap dupOptionCheck(HashMap<String, Object> params) throws Exception{
		EgovMap result = systemPageMapper.getOptionById(params);
		EgovMap msg = new EgovMap();
		
        if (result != null) {
        	msg.put("msg", "코드명이 존재합니다.");
        	msg.put("flag", false);
        }else{
        	msg.put("msg", "사용가능한 코드명입니다.");
        	msg.put("flag", true);
        }

        return msg;
	}
	
	@Override
	public void createOption(HashMap<String, Object> params) throws Exception {
		try {
			systemPageMapper.createOption(params);
        } catch (Exception e) {
        	return;
        }
	}
	
	@Override
	public void deleteOption(HashMap<String, Object> params) throws Exception {
		try {
			systemPageMapper.deleteOption(params);
        } catch (Exception e) {
        	return;
        }
	}
}
