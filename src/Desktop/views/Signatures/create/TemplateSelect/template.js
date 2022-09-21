// TEMPLATE RENDERING FOR SELECTION

import parse from "html-react-parser"

export default function Template({ template, infos, options }) {
    // console.log(template, template.replace('{{ user.firstName }}', 'infos.firstName.value' || 'Prénom'))
    let replaced;
    replaced = template.replaceAll('{{ user.firstName }}', infos?.firstName?.value || 'Prénom')
    replaced = replaced.replaceAll('{{ user.lastName }}', infos?.lastName?.value || 'Nom')
    replaced = replaced.replaceAll('{{ user.position }}', infos?.firstName?.value || 'Poste')
    
    replaced = replaced.replaceAll('{{ absolute_url(asset(logo)) }}', infos?.logo.path || "https://fakeimg.pl/108?font=noto&font_size=12")
    replaced = replaced.replaceAll('{{ company.name }}', infos?.firstName?.value || 'Société')
    replaced = replaced.replaceAll('{{ address.street }}', infos?.firstName?.value || 'Adresse')
    replaced = replaced.replaceAll('{{ address.streetInfo }}', infos?.firstName?.value || 'Adresse 2')
    replaced = replaced.replaceAll('{{ address.zipCode }}', infos?.firstName?.value || 'Code postal')
    replaced = replaced.replaceAll('{{ address.city }}', infos?.firstName?.value || 'Ville')
    replaced = replaced.replaceAll('{{ address.country }}', infos?.firstName?.value || 'Pays')

    replaced = replaced.replaceAll('{{ user.mobilePhone }}', infos?.firstName?.value || 'Mobile')
    replaced = replaced.replaceAll('{{ user.phone }}', infos?.firstName?.value || 'Fixe')

    replaced = replaced.replaceAll('{{ event.imagePath }}', infos?.logo.path || `https://fakeimg.pl/380x126?font=noto&font_size=14`)
    return parse(replaced)
}