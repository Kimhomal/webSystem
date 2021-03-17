package am.system.service;

import java.util.HashMap;
import java.util.List;

import am.common.paging.PagingInfo;
import egovframework.rte.psl.dataaccess.mapper.Mapper;
import egovframework.rte.psl.dataaccess.util.EgovMap;

@Mapper("systemPageMapper")
public interface SystemPageMapper {
	public List<?> getCorpList(PagingInfo pagingInfo) throws Exception;
	
	public EgovMap getCorpById(HashMap<String, Object> params) throws Exception;
	
	public EgovMap getCorpByName(HashMap<String, Object> params) throws Exception;
	
	public int getCountCorpList(PagingInfo pagingInfo) throws Exception;
	
	public void createCorp(HashMap<String, Object> params) throws Exception;
	
	public List<?> getUserList(PagingInfo pagingInfo) throws Exception;
	
	public int getCountUserList(PagingInfo pagingInfo) throws Exception;
	
	public List<?> getWaitUserList(PagingInfo pagingInfo) throws Exception;
	
	public int getCountWaitUserList(PagingInfo pagingInfo) throws Exception;
	
	public EgovMap getRoleById(HashMap<String, Object> params) throws Exception;
	
	public List<?> getOptions(HashMap<String, Object> params) throws Exception;
	
	public int getCountOptions(PagingInfo pagingInfo) throws Exception;
	
	public List<?> getOptionsDatatable(PagingInfo pagingInfo) throws Exception;
	
	public EgovMap getOptionById(HashMap<String, Object> params) throws Exception;
	
	public void createOption(HashMap<String, Object> params) throws Exception;
	
	public void deleteOption(HashMap<String, Object> params) throws Exception;
}
