/**
 * Salad Menu, instead of hamburgers and kebabs.
 *
 * Salad Menu, version 0.1.0.
 *
 * Let us stop hiding away the menus!
 *
 * People who don't know what three lines means can use it.
 * People who use browsers without javascript support can use it.
 * Even blind people should be able to use this menu with ease.
 *
 * Code Copyright Lars-Erik Bruce 2016 and available through github
 * with standard MIT license.
 *
 * The concept is dedicated to public domain.
 */
(function() {
	// Constants
	var mobileBreakpoint = 600 // Must be in sync with $mobile-breakpoint

	// Nodes
	var saladmenu
	var submenus

	// States and variables
	var menuActive = false
	var activeSubmenu
	var mouseoutTimer

	function runProgJs() {
		saladmenu = document.querySelector('nav.salad-menu')
		submenus = document.querySelectorAll('.salad-menu-link')

		Array.prototype.forEach.call(submenus, function(a) {
			a.parentNode.setAttribute('aria-expanded', 'false')

			a.addEventListener('focus', function openMenu(e) {

				if(activeSubmenu) {
					if(activeSubmenu.contains(e.target)) return

					activeSubmenu.style.marginLeft = ''
					activeSubmenu.parentNode.setAttribute('aria-expanded', 'false')
				}

				menuActive = true

				// Return if not submenu
				if(!e.target.classList.contains('salad-menu-link--submenu')) return


				// Desktop specific placement of submenus				
				if(window.innerWidth < mobileBreakpoint) return

				var location = e.target.getBoundingClientRect()
				activeSubmenu = e.target.nextElementSibling

				activeSubmenu.parentNode.setAttribute('aria-expanded', 'true')

				// Place submenu right below button that opens it
				activeSubmenu.style.top = parseInt(location.bottom, 10) + 'px'

				activeSubmenu.style.marginLeft = '0'
				location = activeSubmenu.getBoundingClientRect()

				// Place submenu inside of viewport
				if(window.innerWidth < location.right) {
					activeSubmenu.style.right = '0'
				}
			})

			a.addEventListener('mouseover', function mouseOver(e) {
				if(!menuActive) return
				if(activeSubmenu && activeSubmenu.contains(e.target)) return

				e.target.focus()
			})
		})
		

		function insideMenu(node) {
			if(!node || node.nodeName === 'BODY') return false

			if(node.nodeName === 'NAV' && node.classList.contains('salad-menu'))
				return true

			return insideMenu(node.parentNode)
		}

		window.addEventListener('click', function(e) {
			if(!insideMenu(e.target) && menuActive) {
				menuActive = false

				if(!activeSubmenu) return
				activeSubmenu.style.marginLeft = ''
				activeSubmenu.style.right = ''
				activeSubmenu.parentNode.setAttribute('aria-expanded', 'false')
			}
		})

		window.addEventListener('mouseover', function(e) {
			if(!menuActive) return

			if(insideMenu(e.target) && mouseoutTimer) {
				window.clearTimeout(mouseoutTimer)
				return
			}
			
			mouseoutTimer = window.setTimeout(function() {
				document.activeElement.blur()

				menuActive = false

				if(!activeSubmenu) return

				activeSubmenu.style.marginLeft = ''
				activeSubmenu.style.right = ''

				activeSubmenu.parentNode.setAttribute('aria-expanded', 'false')
			}, 1000)
		})

	}

	window.addEventListener('load', runProgJs)

})();