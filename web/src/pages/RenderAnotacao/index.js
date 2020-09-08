import React, { useMemo } from 'react';
import { PDFDownloadLink, Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../../assets/logococ.png';
import footer from '../../assets/footer.png';

const Anotacao = () => (
    <Document>
        <Page style={styles.body}>
            <Image
                style={styles.image}
                src={logo}
            />
            <View style={styles.footer}>
                <View style={styles.footerText}>
                    <Text style={styles.text}>_________________________________________</Text>
                    <Text style={styles.text}>Médico</Text>
                </View>
                <Image
                    style={styles.image}
                    src={footer}
                />
            </View>
        </Page>
    </Document>
);

export const DownloadAnotacao = () => (
    useMemo(
        () => (
            <PDFDownloadLink document={<Anotacao />} fileName="anotacoes.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Carregando o documento...' : <button className="button" id="downloadButton" type="button">Gerar folha de anotações</button>)}
            </PDFDownloadLink>
        ),
        [],
    )
)

const styles = StyleSheet.create({
    body: {
        paddingTop: 15,
        paddingHorizontal: 1,
    },
    text: {
        color: '#192F5E',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Times-Roman'
    },
    image: {
        width: '100%'
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