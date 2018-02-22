import styled from 'styled-components'

export const Footer = styled.div`
  background: #333;
  color: white;
`

export const FooterContainer = styled.div`
  background: transparent;
  padding-left: 20px;
  padding-right: 20px;
`

export const Tools = styled.div`
  display: flex;
  align-items: center;
  background: #fff;
  flex-direction: row;
  justify-content: center;
`

export const ToolLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-bottom: 10px;
`

export const ToolLogoImage = styled.img`
  max-width: 50px;
  max-height: 50px;
`

export const NavBar = styled.nav`
  background: #fff947;
`

export const NavBarMenu = styled.div`
  margin: 0 !important;
`

export const NavBarMenuItem = styled.a`
  color: #fff;
`

export const Content = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 0 !important;
`

export const PreviewFrame = styled.iframe`
  width: 100%;
  height: 410px;
  max-width: 300px;
  position: absolute;
  right: 20px;
  background: repeating-linear-gradient( 135deg, #fff000, #fff000 20px, #CCC000 20px, #ccc000 40px );
  z-index: 1;
  border: 1px solid rgba(0,0,0,0.1);
`

export const Url = styled.a`
  font-size: 12px;
`

export const Logo = styled.img`
  height: 40px;
  max-height: 40px !important;
`

export const AddForm = styled.div`
  margin: 10px 10px 0 10px;
`
