import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
  Avatar,
  Input,
  useToast
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { userContext } from "../providers/UserContext";
import { useContext } from "react";
import { useHistory } from "react-router";
import { UserActionType } from "../reducers/UserReducer";
import { Props } from "framer-motion/types/types";
import { useForm } from "react-hook-form";
import logo from "../assets/img/logoNav.png";

const NavBar = () => {
  let history = useHistory();
  const { isOpen, onToggle } = useDisclosure();
  const user = useContext(userContext);
  if (user === undefined)
    throw new Error("Please use within UserContextProvider");
  const { isAuthenticated } = user.state;

  const logOut = () => {
    user.dispatch({ type: UserActionType.LOGOUT, user: {} });
    localStorage.clear();
  };
  return (
    <Box minW={"100%"} position={"fixed"} zIndex={"1"}>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        <Flex flex={{ base: 1 }} alignItems={"center"}>
          <Link
            fontWeight={500}
            color={"gray.600"}
            _hover={{
              textDecoration: "none",
              color: "gray.800",
            }}
            href="/"
          >
          {/* LOGO */}
          <img alt={"logo"} src={logo} width={"90px"} />
          </Link>
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>
        {isAuthenticated ? (
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <UserSearchBar/>
            <Box>
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <PopoverTrigger>
                  <Avatar
                    bg="primary.main"
                    color="white"
                    icon={<AiOutlineUser fontSize="1.5rem" />}
                  />
                </PopoverTrigger>

                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={"white"}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    <DesktopSubNav {...SETTINGS_ITEMS[0]} />
                    <Button bgColor="primary.light" onClick={() => logOut()}>
                      Log out
                    </Button>
                  </Stack>
                </PopoverContent>
              </Popover>
            </Box>
          </Flex>
        ) : (
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <Button
              variant={"link"}
              onClick={() => history.push("/login")}
              mr="1rem"
            >
              Ingresar
            </Button>
            <Button onClick={() => history.push("/signup")}>Registrarme</Button>
          </Flex>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav
          logout={logOut}
          isAuthenticated={isAuthenticated}
          history={history}
        />
      </Collapse>
    </Box>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                fontWeight={500}
                color={"gray.600"}
                _hover={{
                  textDecoration: "none",
                  color: "gray.800",
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={"white"}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: "blue.50" }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            color="gray.600"
            transition={"all .3s ease"}
            _groupHover={{ color: "secondary.main" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text color="gray" fontSize={"sm"}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"secondary.main"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ logout, isAuthenticated, history }: Props) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack bg={"white"} p={4} display={{ md: "none" }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {isAuthenticated ? (
        <Stack spacing={4} onClick={SETTINGS_ITEMS && onToggle}>
          <Flex
            py={2}
            as={Link}
            justify={"space-between"}
            align={"center"}
            _hover={{
              textDecoration: "none",
            }}
          >
            <Avatar
              bg="primary.main"
              color="white"
              icon={<AiOutlineUser fontSize="1.5rem" />}
            />
            {SETTINGS_ITEMS && (
              <Icon
                as={ChevronDownIcon}
                transition={"all .25s ease-in-out"}
                transform={isOpen ? "rotate(180deg)" : ""}
                w={6}
                h={6}
                color="gray.800"
              />
            )}
          </Flex>

          <Collapse
            in={isOpen}
            animateOpacity
            style={{ marginTop: "0!important" }}
          >
            <Stack
              mt={2}
              pl={4}
              borderLeft={1}
              borderStyle={"solid"}
              borderColor={"gray.200"}
              align={"start"}
            >
              <Link
                key={SETTINGS_ITEMS[0].label}
                py={2}
                href={SETTINGS_ITEMS[0].href}
                color="gray.800"
              >
                {SETTINGS_ITEMS[0].label}
              </Link>
              <Button bgColor="primary.light" onClick={() => logout()}>
                Log out
              </Button>
            </Stack>
          </Collapse>
        </Stack>
      ) : (
        <Stack>
          <Button
            variant={"link"}
            onClick={() => history.push("/login")}
            mb="1rem"
          >
            Ingresar
          </Button>
          <Button onClick={() => history.push("/signup")}>Registrarme</Button>
        </Stack>
      )}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text fontWeight={600} color={"gray.600"}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            color="gray.800"
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={"gray.200"}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href} color="gray.800">
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const SETTINGS_ITEMS = [
  { label: "Perfil", href: "/profile" },
  { label: "Log out" },
];

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Anime",
    children: [
      {
        label: "Top",
        subLabel: "Descubre los mejores animes",
        href: "/top",
      },
      {
        label: "Buscar",
        subLabel:
          "Encuentra el anime de tu preferencia con nuestros filtros avanzados",
        href: "/search-anime",
      },
    ],
  },
  {
    label: "Comunidad",
    children: [
      {
        label: "Amigos",
        subLabel: "Entérate de lo que les gusta a tus amigos",
        href: "/amigos",
      },
      {
        label: "Foros",
        subLabel: "Mantente al día con las noticias y tendencias de anime",
        href: "/foros",
      },
    ],
  },
];

export default NavBar;

const UserSearchBar = () => {
  const history = useHistory();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    if(data.username.trim()!==''){
      history.push("/search-user/"+data.username.trim());
    }else{
      toast({
        title: "Advertencia",
        description: "Ingresa al menos un caracter para buscar usuarios",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    }
  };
 
  return (
    <Flex display={{ base: "none", md: "flex" }} ml={10} marginRight={"5"}>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Flex mar>
        <Box className={"input-box"}>
            <Input
              type={"text"}
              placeholder={"Usuario"}
              {...register("username", {
                required: "Debe ingresar un criterio de búsqueda",
                maxLength: {
                  value: 15,
                  message: "No se permiten más caracteres"
                }
              })}    
            />
            {errors.username && <span>{errors.username.message}</span>}
        </Box>
        <Button
          marginTop={"10px"}
          backgroundColor={"primary.dark"}
          type={"submit"}
        >
          Buscar Usuarios
        </Button>
      </Flex>
          
      </form>
    </Flex>
  )
};
