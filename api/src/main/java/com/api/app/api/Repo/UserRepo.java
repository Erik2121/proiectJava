package com.api.app.api.Repo;

import com.api.app.api.Models.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo  extends JpaRepository<Users,Long> {
}
