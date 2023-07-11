package com.codestates.mainProject.posts.controller;

import com.codestates.mainProject.dto.MultiResponseDto;
import com.codestates.mainProject.dto.PageInfo;
import com.codestates.mainProject.dto.SingleResponseDto;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.service.MemberService;
import com.codestates.mainProject.posts.dto.PostDto;
import com.codestates.mainProject.posts.entity.Post;
import com.codestates.mainProject.posts.mapper.PostMapper;
import com.codestates.mainProject.posts.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/posts")
@Validated
public class PostController {
    private final PostService postService;

    private final MemberService memberService;
    private final PostMapper mapper;

    public PostController(PostService postService, MemberService memberService, PostMapper mapper) {
        this.postService = postService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postPost(@Valid @RequestBody PostDto.RequestDto requestDto) {
        Post post = mapper.postRequestToPost(requestDto);
        Post createPost = postService.createPost(post);
        PostDto.ResponseDto responseDto = mapper.postToPostResponse(createPost);
        return new ResponseEntity(responseDto, HttpStatus.CREATED);
    }

    @PutMapping("/{post_id}")
    public ResponseEntity putPost(@PathVariable("post_id") @Positive long postId,
                                  @Valid @RequestBody PostDto.RequestDto requestDto) {
        Post post = mapper.postRequestToPost(requestDto);
        post.setPostId(postId);
        Post updatePost = postService.updatePost(post);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.postToPostResponse(updatePost)),
                HttpStatus.OK);
    }

    @GetMapping("/{post_id}")
    public ResponseEntity getPost(@PathVariable("post_id") @Positive long postId) {
        Post post = postService.getPost(postId);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.postToPostResponse(post)),
        HttpStatus.OK);
    }

    @GetMapping("/member/{member_id}")
    public ResponseEntity getMemberPost(@PathVariable("member_id") @Positive long memberId,
                                   @Positive @RequestParam(defaultValue = "1") int page) {

        Member member = memberService.getMemberById(memberId);

        Pageable pageable = PageRequest.of(page, 15, Sort.by("createdAt").descending());

        Page<Post> pagePosts = postService.getPostsByMember(member, pageable);

        List<Post> posts = pagePosts.getContent();
        List<PostDto.ResponseDto> responseDto = mapper.postListToPostResponseList(posts);

        return new ResponseEntity<>(
                new MultiResponseDto<>(responseDto, pagePosts),
                HttpStatus.OK);
    }

    /**
     * GET 요청을 통해 페이지별 데이터를 조회합니다.
     * 요청 파라미터로 페이지 번호를 지정할 수 있습니다.
     * @param page 조회할 페이지 번호 (기본값: 1)
     * @param category 조회할 카테고리 (해당 파라미터가 존재할 경우만 적용)
     */
    @GetMapping
    public ResponseEntity getPosts(@RequestParam(value = "category", required = false) String category,
                                   @Positive @RequestParam(defaultValue = "1") int page,
                                   @RequestParam(required = false) Long lastPostId) {

        Pageable pageable = PageRequest.of(page - 1, 15, Sort.by("createdAt").descending());
        Page<Post> pagePosts;
        if (category == null || category.isEmpty()) {
            if (lastPostId != null) {
                pagePosts = postService.getPostsByIdLessThan(lastPostId, pageable);
            } else {
                pagePosts = postService.getPosts(pageable);
            }
        } else {
            if (lastPostId != null) {
                pagePosts = postService.getPostsByCategoryAndIdLessThan(category, lastPostId, pageable);
            } else {
                pagePosts = postService.getPostsByCategory(category, pageable);
            }
        }
        List<Post> posts = pagePosts.getContent();
        List<PostDto.ResponseDto> responseDto = mapper.postListToPostResponseList(posts);

        MultiResponseDto<PostDto.ResponseDto> multiResponseDto;
        if (pagePosts.hasNext()) {
            multiResponseDto = new MultiResponseDto<>(responseDto, new PageInfo(page, 15, pagePosts.getTotalElements(), pagePosts.getTotalPages(), true));
        } else {
            multiResponseDto = new MultiResponseDto<>(responseDto, new PageInfo(page, 15, pagePosts.getTotalElements(), pagePosts.getTotalPages(), false));
        }

        return new ResponseEntity<>(multiResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{post_id}")
    public ResponseEntity deleteQuestion(@PathVariable("post_id") @Positive long postId) {
        postService.deletePost(postId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
