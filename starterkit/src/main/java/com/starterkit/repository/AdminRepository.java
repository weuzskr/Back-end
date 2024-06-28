package com.starterkit.repository;

import com.starterkit.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    boolean existsByUsername(String username);
    Optional<Admin> findByUsername(String username);
    Optional<Admin> findByEmail(String email);

    @Query(value = "SELECT a.*\n" +
            "FROM admin a\n" +
            "JOIN admin_roles ar ON a.id = ar.admin_id\n" +
            "JOIN role r ON ar.role_id = r.id\n" +
            "WHERE r.id = 2;\n", nativeQuery = true)

    List<Admin> findAdminsByRoleId(@Param("roleId") String roleId);

}
