package am.common.paging;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class PagingInfo {
	/**
	 * 갱신 갯수
	 * */
	private int drawCount;
	/**
	 * 현재 DB에 요청할 Offset
	 * */
	private int start;
	/**
	 * DB에 요청할 데이터 개수
	 * */
	private int length;
	/**
	 * 전체 컬럼 길이
	 * */
	private int colLength;
	/**
	 * 검색 여부
	 * */
	private boolean searchable = false;
	/**
	 * 정렬에 사용할 컬럼
	 * */
	private String orderColumn = null;
	/**
	 * 정렬 방향 (asc, desc)
	 * */
	private String orderDirection = null;
	/**
	 * 검색 컬럼 리스트
	 * */
	private List<String> searchColumn = new ArrayList<String>();
	/**
	 * 검색 값
	 * */
	private String searchVal = null;
	/**
	 * 그 외 값
	 * */
	private HashMap<String, Object> attr = new HashMap<>();
	
	public PagingInfo(HashMap<String, Object> request){
//		this.setColLength(Integer.parseInt((String) request.get("colLength")));
		if(request.get("draw") != null) {
			this.setDrawCount(Integer.parseInt((String) request.get("draw")));
		}
		
		if(request.get("start") != null) {
			this.setStart(Integer.parseInt((String) request.get("start")));
		}
		
		if(request.get("length") != null) {
			this.setLength(Integer.parseInt((String) request.get("length")));
		}
		
		if(request.get("order[0][column]") != null) {
			int orderNum = Integer.parseInt((String) request.get("order[0][column]"));
			this.setOrderColumn((String) request.get("columns["+orderNum+"][name]"));
			this.setOrderDirection((String) request.get("order[0][dir]"));
		}
		
		if(request.get("search[value]") != null) {
			this.setSearchVal((String) request.get("search[value]"));
		}
		
		for(int i = 0; request.get("columns[" + i + "][data]") != null; i++){
			String flag = (String) request.get("columns[" + i + "][searchable]");
			if(flag.equals("true")){
				searchable = true;
				searchColumn.add((String)request.get("columns[" + i + "][name]"));
			}
			this.setColLength(i);
		}
		
		if(searchable){
			if(searchVal.trim().isEmpty()){
				searchable = false;
				searchColumn.clear();
			}
		}
	}
	
	
	public PagingInfo(int drawCount, int start, int displayLength, int colLength, String orderColumn, String orderDirection) {
		super();
		this.drawCount = drawCount;
		this.start = start;
		this.length = displayLength;
		this.colLength = colLength;
		this.orderColumn = orderColumn;
		this.orderDirection = orderDirection;
	}


	public PagingInfo(int drawCount, int start, int displayLength, int colLength, String orderColumn, String orderDirection,
			List<String> searchColumn, String searchVal) {
		super();
		this.drawCount = drawCount;
		this.start = start;
		this.length = displayLength;
		this.colLength = colLength;
		this.orderColumn = orderColumn;
		this.orderDirection = orderDirection;
		this.searchColumn = searchColumn;
		this.searchVal = searchVal;
	}
	
	public int getColLength() {
		return colLength;
	}


	public void setColLength(int colLength) {
		this.colLength = colLength;
	}
	public int getDrawCount() {
		return drawCount;
	}


	public void setDrawCount(int drawCount) {
		this.drawCount = drawCount;
	}


	public int getStart() {
		return start;
	}


	public void setStart(int start) {
		this.start = start;
	}


	public int getLength() {
		return length;
	}


	public void setLength(int length) {
		this.length = length;
	}


	public String getOrderColumn() {
		return orderColumn;
	}


	public void setOrderColumn(String orderColumn) {
		this.orderColumn = orderColumn;
	}


	public String getOrderDirection() {
		return orderDirection;
	}


	public void setOrderDirection(String orderDirection) {
		this.orderDirection = orderDirection;
	}


	public List<String> getSearchColumn() {
		return searchColumn;
	}


	public void setSearchColumn(List<String> searchColumn) {
		this.searchColumn = searchColumn;
	}


	public String getSearchVal() {
		return searchVal;
	}


	public void setSearchVal(String searchVal) {
		this.searchVal = searchVal;
	}
	
	public boolean isSearchable() {
		return searchable;
	}

	public void setSearchable(boolean searchable) {
		this.searchable = searchable;
	}
	
	public HashMap<String, Object> getAttr() {
		return attr;
	}

	public void setAttr(String str, Object obj) {
		this.attr.put(str, obj);
	}
}
