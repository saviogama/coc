import React, { useMemo } from 'react';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';
import table from '../../assets/table.png';

function Prescricao() {
    return (
        <Document>
            <Page style={styles.body}>
                <Image
                    style={styles.image}
                    src={logo}
                />
                <Text style={styles.titleTop}>Para o Sr(a):</Text>
                <Text style={styles.description}>________________________________________________________</Text>
                <Text style={styles.title}>Sugestão de lentes:</Text>
                <Text style={styles.description}>(     ) Visão simples: ________________________________________</Text>
                <Text style={styles.description}>(     ) Multifocais: __________________________________________</Text>
                <Text style={styles.description}>(     ) Bifocais: _____________________________________________</Text>
                <Text style={styles.title}>Obs.:</Text>
                <Text style={styles.description}>_______________________________________________________________</Text>
                <Text style={styles.description}>_______________________________________________________________</Text>
                <Text style={styles.description}>_____ / _____ 20_____      ___________________________________</Text>
                <Text style={styles.text}>Médico</Text>
                <Text style={styles.titleFooter}>Prescrição de lentes corretivas</Text>
                <Image
                    style={styles.table}
                    src={table}
                />
                <Text style={styles.titleTable}>Confira as lentes antes de usar</Text>
                <View style={styles.footer}>
                    <Image
                        style={styles.image}
                        src={footer}
                    />
                </View>
            </Page>
        </Document>
    );
}

export function DownloadPrescricao() {
    return (
        useMemo(
            () => (
                <PDFDownloadLink document={<Prescricao />} fileName="prescricao.pdf">
                    {({ blob, url, loading, error }) => (loading ? '...' : <button className="button" id="downloadButton" type="button">Gerar prescrição</button>)}
                </PDFDownloadLink>
            ),
            [],
        )
    )
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingHorizontal: 1,
    },
    titleTop: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 100,
        marginTop: 30,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    titleFooter: {
        color: '#192F5E',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 100,
        marginTop: 30,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    titleTable: {
        color: '#192F5E',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 100,
        marginTop: 1,
        fontFamily: 'Times-Roman'
    },
    title: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 100,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Times-Roman'
    },
    description: {
        color: '#192F5E',
        fontSize: 14,
        marginHorizontal: 100,
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    date: {
        color: '#192F5E',
        marginHorizontal: 25,
        marginVertical: 150,
        fontSize: 14,
        textAlign: 'right',
        fontFamily: 'Times-Roman'
    },
    text: {
        color: '#192F5E',
        fontSize: 14,
        marginLeft: 350,
        fontFamily: 'Times-Roman'
    },
    image: {
        width: '100%'
    },
    table: {
        width: '80%',
        alignContent: 'center',
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    footerText: {
        marginBottom: 35
    },
    footer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center"
    }
});