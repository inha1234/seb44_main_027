package com.codestates.mainProject.posts.service;

import com.codestates.mainProject.dto.MultiResponseDto;
import com.codestates.mainProject.dto.PageInfo;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import com.codestates.mainProject.member.entity.Member;
import com.codestates.mainProject.member.repository.MemberRepository;
import com.codestates.mainProject.posts.dto.PostDto;
import com.codestates.mainProject.posts.entity.Post;
import com.codestates.mainProject.posts.mapper.PostMapper;
import com.codestates.mainProject.posts.repository.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final PostMapper mapper;

    public PostService(PostRepository postRepository, MemberRepository memberRepository, PostMapper mapper) {
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
        this.mapper = mapper;
    }

    /** 게시글 생성 */
    public Post createPost(Post post) {
        /** JWT토큰정보를 이용한 사용자 인증 */
       /* String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Optional<Member> verifiedMember = memberRepository.findByEmail(principal);

        Member member = verifiedMember.
                orElseThrow(() -> new BusinessLogicException(ExceptionCode.NO_PERMISSION));

        post.setMember(member);
        member.addPost(post);*/
        return postRepository.save(post);
    }

    /** 게시글 수정 */
    public Post updatePost(Post post) {
        Post findPost = findVerifiedPost(post.getPostId());
        /** JWT토큰정보를 이용한 사용자 인증 */
        /*String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!findPost.getMember().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);*/

        Optional.ofNullable(post.getTitle())
                .ifPresent(title -> findPost.setTitle(title));
        Optional.ofNullable(post.getContent())
                .ifPresent(content -> findPost.setContent(content));
        Optional.ofNullable(post.getCategory())
                .ifPresent(category -> findPost.setTitle(category));
        Optional.ofNullable(post.getImageUrl())
                .ifPresent(imageUrl -> findPost.setImageUrl(imageUrl));
        return postRepository.save(findPost);
    }

    /** 게시글 조회 */
    public Post getPost(long postId) {
        Post findPost = findVerifiedPost(postId);

        return findPost;
    }

    /** 게시글 전체 조회 */
    public Page<Post> getPosts(Pageable pageable) {
        return postRepository.findAll(pageable);
    }

    /** 카테고리별 게시글 전체 조회 */
    public Page<Post> getPostsByCategory(String category, Pageable pageable) {
        return postRepository.findByCategory(category, pageable);
    }

    public Page<Post> getPostsByIdLessThan(Long lastPostId, Pageable pageable) {
        return postRepository.findByPostIdLessThan(lastPostId, pageable);
    }

    public Page<Post> getPostsByCategoryAndIdLessThan(String category, Long lastPostId, Pageable pageable) {
        return postRepository.findByCategoryAndPostIdLessThan(category, lastPostId, pageable);
    }

    public Page<Post> getPostsByMember(Member member, Pageable pageable) {
        Pageable pageRequest = PageRequest.of(pageable.getPageNumber() - 1,
                pageable.getPageSize(), Sort.by("createdAt").descending());
        return postRepository.findByMember(member, pageRequest);
    }

    /** 게시글 삭제 */
    public void deletePost(long postId) {
        Post findPost = findVerifiedPost(postId);
        /** JWT토큰정보를 이용한 사용자 인증 */
        /*String principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if (!findPost.getMember().getEmail().equals(principal))
            throw new BusinessLogicException(ExceptionCode.NO_PERMISSION);*/
        postRepository.deleteById(postId);
    }

    public MultiResponseDto getMyPosts(Member member, String category, int page, int size, Long lastPostId){
        Pageable pageRequest = PageRequest.of(page-1, size, Sort.by("createdAt").descending());
        Page<Post> findPage;
        if(lastPostId == null){
            findPage = postRepository.findByMemberAndCategory(member, category, pageRequest);
        } else {
            findPage = postRepository.findByMemberAndCategoryAndPostIdLessThan(member, category, lastPostId, pageRequest);
        }
        List<Post> listPost = findPage.getContent();
        PageInfo pageInfo = new PageInfo(page,findPage.getSize(),findPage.getTotalElements(),findPage.getTotalPages(), findPage.hasNext());
        List<PostDto.ResponseDto> responseDto = mapper.postListToPostResponseList(listPost);
        return new MultiResponseDto(responseDto,pageInfo);
    }

    /** 게시글 존재하는지 확인 */
    public Post findVerifiedPost(long postId) {
        Optional<Post> optionalQuestion = postRepository.findByPostId(postId);
        Post findPost = optionalQuestion.orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        return findPost;
    }

}
