<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			사용자 목록
			<div class="sub header">등록된 사용자 목록</div>
		</h1>
	</div>
</div>

<div class="ui basic segment">
	<div class="ui grid">
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<div class="ui clearing basic segment">
				<div class="ui right floated labeled icon buttons">
					<button class="ui red button add-corp">
						<i class="minus icon"></i>사용자 삭제
					</button>
				</div>
			</div>
			<table id="userTable" class="ui celled table" style="width:100%">
			</table>
		</div>
	</div>
</div>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			사용자 승인대기 목록
			<div class="sub header">승인 대기 중 사용자 목록</div>
		</h1>
	</div>
</div>

<div class="ui basic segment">
	<div class="ui grid">
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<div class="ui clearing basic segment">
				<button class="ui labeled right floated icon red button">
					<i class="minus icon"></i>사용자 삭제
				</button>
				<button class="ui labeled right floated icon green button">
					<i class="check icon"></i>사용자 승인
				</button>
			</div>
			<table id="waitTable" class="ui celled table" style="width:100%">
			</table>
		</div>
	</div>
</div>

<div class="ui modal">
	<div class="header">업체 추가</div>
	<div class="scrolling content">
		<form id="addCorpForm" class="ui form basic segment">
			<div class="two fields">
				<div class="field">
					<label>업체명</label>
					<input placeholder="업체명" name="name" type="text">
				</div>
				<div class="field">
					<label>관리자명</label>
					<input placeholder="관리자명" name="admin" type="text">
				</div>
			</div>
			<div class="field">
				<label>업체 주소</label>
				<input placeholder="성남시 분당구 판교로" name="address" type="text">
			</div>
			<div class="ui error message"></div>
		</form>
	</div>
	<div class="actions">
		<div class="ui red cancel button">
			<i class="remove icon"></i>취소
		</div>
		<div class="ui green ok button">
			<i class="checkmark icon"></i>추가
		</div>
	</div>
</div>