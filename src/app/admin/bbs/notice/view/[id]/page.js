'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import { Button, TextField } from '@mui/material';

// (관리자) 공지사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [vo, setVo] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [commentContent, setCommentContent] = useState('');
	const [disabled, setDisabled] = useState(true);
	const API_URL = `/api/bbs/notice/view?id=${props.params.id}`;

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
			setCommentList(res.data.commentList);
		});
	}

	useEffect(() => {
		if (vo.usIdx == 1 /*(!) 로그인한 유저idx로 변경*/) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [vo]);

	function removeBbs(id) {
		if (confirm('게시글을 삭제 하시겠습니까?')) {
			axios.get(`/api/bbs/notice/remove?id=${id}`).then((res) => {
				if (res.data == true) {
					alert('삭제 완료 되었습니다.');
					router.push('/admin/bbs/notice/list');
				} else alert('삭제 실패 !');
			});
		}
	}

	// 댓글
	function removeComment(id) {
		if (confirm('댓글을 삭제 하시겠습니까?')) {
			axios.get(`/api/comment/remove?id=${id}`).then((res) => {
				if (res.data == true) alert('삭제 완료 되었습니다.');
				else alert('삭제 실패 !');
				getData();
			});
		}
	}

	function saveComment() {
		if (commentContent.trim().length < 1) {
			alert('댓글을 입력하세요.');
		} else if (commentContent.length > 100) {
			alert('최대 100글자까지 입력할 수 있습니다.');
		} else {
			axios
				.get('/api/comment/write', {
					params: {
						content: commentContent,
						usIdx: 1, //로그인한 유저 idx로 변경 (!)
						boIdx: props.params.id,
					},
				})
				.then((res) => {
					document.getElementById('commentWrite').value = '';
					getData();
				});
		}
	}

	function changeComment(event) {
		var c = event.target.value;
		if (c.length > 100) {
			alert('최대 100글자까지 입력할 수 있습니다.');
			event.target.value = c.substring(0, 99);
		} else {
			setCommentContent(c);
		}
	}

	const [editingCommentId, setEditingCommentId] = useState(null);
	const [newContent, setNewContent] = useState('');

	const EditClick = (comment) => {
		setEditingCommentId(comment.id);
		setNewContent(comment.commContent);
	};

	const SaveClick = (commentId) => {
		updateComment(commentId, newContent);
		setEditingCommentId(null);
	};

	function updateComment(id, content) {
		axios
			.get('/api/comment/edit', {
				params: {
					id: id,
					content: content,
				},
			})
			.then(() => {
				getData();
			});
	}

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.boTitle}</h1>
				<div className='post_meta'>
					<span>By {vo.usId}</span>
					<span>{vo.boWritedate}</span>
					<span>조회: {vo.boHit}</span>
					<span>추천: {vo.boLike ? vo.boLike : 0}</span>
				</div>
			</div>
			<div className='post_content'>
				<p>{vo.boContent}</p>
			</div>
			<div className='post_comments'>
				<h2>댓글</h2>
				<ul>
					{commentList.map((comment, index) => (
						<li key={index} className='comment_item'>
							<p className='comment_writer'>
								<strong>{comment.usId}</strong> :
							</p>
							{editingCommentId === comment.id ? (
								<>
									<input className='editCommentInput' type='text' value={newContent} onChange={(e) => setNewContent(e.target.value)} />
									<Button className='edit-button' variant='text' size='small' onClick={() => SaveClick(comment.id)}>
										저장
									</Button>
									<Button className='delete-button' variant='text' color='error' size='small' onClick={() => setEditingCommentId(null)}>
										취소
									</Button>
								</>
							) : (
								<>
									<Button className='edit-button' variant='text' size='small' hidden={comment.usIdx != 1} onClick={() => EditClick(comment)}>
										{/* (!) 로그인한 유저idx로 수정 */}
										수정
									</Button>
									<Button className='delete-button' variant='text' color='error' size='small' onClick={() => removeComment(comment.id)}>
										삭제
									</Button>
									<p className='comment_content'>{comment.commContent}</p>
									<p className='comment_date'>{comment.commWritedate}</p>
								</>
							)}
						</li>
					))}
				</ul>
				<TextField id='commentWrite' label='댓글작성' variant='outlined' style={{ width: '870px' }} onChange={changeComment} />

				<Button
					className='commentSaveBtn'
					variant='outlined'
					size='small'
					onClick={() => {
						saveComment();
					}}
				>
					저장
				</Button>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push(`/admin/bbs/notice/list?cPage=${props.searchParams.cPage}`)}>
					목록
				</Button>
				<Button variant='outlined' disabled={disabled} size='small' onClick={() => router.push(`/admin/bbs/notice/edit/${vo.id}`)}>
					{/*로그인한 유저 idx로 변경 (!)*/}
					수정
				</Button>
				<Button variant='outlined' size='small' color='error' onClick={() => removeBbs(vo.id)}>
					삭제
				</Button>
			</div>
		</div>
	);
}
