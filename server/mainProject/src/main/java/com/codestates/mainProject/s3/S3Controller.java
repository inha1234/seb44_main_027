package com.codestates.mainProject.s3;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.codestates.mainProject.exception.BusinessLogicException;
import com.codestates.mainProject.exception.ExceptionCode;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
public class S3Controller {
    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String s3Bucket;

    @PostMapping("/upload")
    public ResponseEntity<List<String>> upload(@RequestParam("files") MultipartFile[] multipartFileList) {
        List<String> imagePathList = Arrays.stream(multipartFileList)
                .map(multipartFile -> {
                    try {
                        String originalName = multipartFile.getOriginalFilename(); // 파일 이름
                        long size = multipartFile.getSize(); // 파일 크기

                        ObjectMetadata objectMetadata = new ObjectMetadata();
                        objectMetadata.setContentType(multipartFile.getContentType());
                        objectMetadata.setContentLength(size);

                        // S3에 업로드
                        amazonS3Client.putObject(new PutObjectRequest(s3Bucket, originalName, multipartFile.getInputStream(), objectMetadata)
                                .withCannedAcl(CannedAccessControlList.PublicRead));

                        String imagePath = amazonS3Client.getUrl(s3Bucket, originalName).toString(); // 접근 가능한 URL 가져오기
                        return imagePath;
                    } catch (IOException e) {
                        // 파일 업로드 과정에서 예외 발생
                        e.printStackTrace();
                        throw new BusinessLogicException(ExceptionCode.UPLOAD_FAIL);
                    }
                })
                .filter(Objects::nonNull) // 예외가 발생하지 않은 결과만 필터링
                .collect(Collectors.toList());

        return ResponseEntity.ok(imagePathList);
    }

}




