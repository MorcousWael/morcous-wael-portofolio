import { Component, AfterViewInit } from '@angular/core';
import { Collapse } from 'bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const links = document.querySelectorAll('.navbar-nav .nav-link');
    links.forEach((link) => {
      link.addEventListener('click', (event) => {
        const targetId = (link.getAttribute('href') || '').substring(1);
        const targetElement = document.getElementById(targetId);

        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse?.classList.contains('show')) {
          const bsCollapse = Collapse.getInstance(navbarCollapse);
          bsCollapse?.hide();
        }

        if (targetElement) {
          event.preventDefault(); // Prevent default anchor jump

          setTimeout(() => {
            const yOffset = -80; // Adjust this to your navbar height
            const y =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 300); // Delay matches collapse animation
        }
      });
    });
  }
}
