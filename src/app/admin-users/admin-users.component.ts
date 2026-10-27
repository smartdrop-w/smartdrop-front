import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LanguageService } from '../shared/language/language.service';
import { AuthService } from '../iam/infrastructure/services/auth.service';

interface UserResponseDto {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
}

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: UserResponseDto[] = [];
  message = '';
  isLoading = false;

  constructor(
    public language: LanguageService,
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    if (!this.authService.getCurrentUser().isAdmin) {
      this.message = 'You do not have permission to view this page.';
      return;
    }

    this.isLoading = true;
    this.http.get<any[]>(`${this.authService.apiUrl}/api/iam/auth/users`).subscribe({
      next: (data) => {
        this.users = (data || []).map((u: any) => ({
          id: u.userId ?? u.id,
          fullName: u.fullName || 'No name',
          email: u.email,
          createdAt: u.createdAt
        }));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.message = 'Failed to load users from server.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
