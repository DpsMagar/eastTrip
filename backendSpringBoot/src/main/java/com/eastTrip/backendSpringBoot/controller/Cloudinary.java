//import com.cloudinary.utils.ObjectUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.Map;
//
//@Autowired
//private com.cloudinary.Cloudinary cloudinary;
//
//@PostMapping("/upload")
//public ResponseEntity<?> upload(@RequestParam("image") MultipartFile file) {
//    try {
//        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
//        String imageUrl = uploadResult.get("secure_url").toString();
//
//        // Save to your model (example)
//        MyEntity entity = new MyEntity();
//        entity.setImageUrl(imageUrl);
//        myEntityRepository.save(entity);
//
//        return ResponseEntity.ok(imageUrl);
//    } catch (IOException e) {
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
//    }
//}
