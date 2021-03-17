<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<div class="ui masthead vertical segment">
	<div class="ui fluid container">
		<h1 class="ui header">
			작업 옵션 관리
			<div class="sub header">작업 옵션 관리하기</div>
		</h1>
	</div>
</div>

<div class="ui vertical segment">
	<div class="ui grid">
		<div class="sixteen wide mobile sixteen wide tablet sixteen wide computer column">
			<div class="ui clearing basic segment">
				<div class="ui right floated labeled icon buttons">
					<button class="ui button add-corp">
						<i class="plus icon"></i>추가
					</button>
					<button class="ui button delete-corp disabled">
						<i class="minus icon"></i>삭제
					</button>
				</div>
			</div>
			<table id="example" class="ui celled table" style="width:100%">
			</table>
		</div>
	</div>
</div>

<div class="ui modal add-modal">
	<div class="header">작업 옵션  추가</div>
	<div class="scrolling content">
		<form id="addOptionsForm" class="ui form basic segment">
			<div class="three fields">
				<div class="field">
					<label>작업코드</label>
					<input placeholder="작업코드" name="id" type="text">
				</div>
				<div class="field">
					<label>작업명</label>
					<input placeholder="작업명" name="name" type="text">
				</div>
				<div class="field">
					<label>단위</label>
					<input placeholder="km" name="unit" type="text">
				</div>
			</div>
			<div class="three fields">
				<div class="field">
					<label>단위당 비용</label>
					<div class="ui right labeled input">
						<input placeholder="1000" name="cost" type="number">
						<div class="ui basic label">원</div>
					</div>
				</div>
			</div>
			<div class="ui error message"></div>
		</form>
	</div>
	<div class="actions">
		<div class="ui red cancel button">
			<i class="remove icon"></i>취소
		</div>
		<div class="ui green ok button">
			<i class="checkmark icon"></i>확인
		</div>
	</div>
</div>

<div class="ui basic modal delete-modal">
	<div class="ui icon header">
		<i class="archive icon"></i>
		정말로 삭제하시겠습니까?
	</div>
	<div class="content">
		<p>삭제된 작업은 되돌릴 수 없습니다.</p>
	</div>
	<div class="actions">
		<div class="ui red basic cancel inverted button">
			<i class="remove icon"></i>취소
		</div>
		<div class="ui green ok inverted button">
			<i class="checkmark icon"></i>삭제
		</div>
	</div>
</div>