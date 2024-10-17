import { DTable, Footer, Menu, Navbar, Title } from "../components";

export const Inicio = () => {
    return (
        <>
            <Navbar />
            <Menu nombre="Stocky's" usuario="Jaimito el Cartero" />
            <div className="content-wrapper">
                <Title title="Bienvenido(s)" breadcrums={["Menú principal"]} />
                <section className="content">

                    

                </section>
            </div>
            <Footer />
        </>
    )
}